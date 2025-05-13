db = connect('mongodb://localhost:27017/basikondb');
db.users.aggregate([
  // Filtrer useres avec l'age >= 18
  {
    $match: {
      age: { $gte: 18 }
    }
  },
  // Créer "ageGroup" basée sur l'age
  {
    $addFields: {
      ageGroup: {
        $switch: {
          branches: [
            { case: { $lte: ["$age", 25] }, then: "18-25" },
            { case: { $and: [{ $gt: ["$age", 25] }, { $lte: ["$age", 35] }] }, then: "26-35" },
            { case: { $and: [{ $gt: ["$age", 35] }, { $lte: ["$age", 50] }] }, then: "36-50" },
            { case: { $gt: ["$age", 50] }, then: "51+" }
          ],
          default: "Unknown"
        }
      }
    }
  },
  // Former les groups par age et compter les users
  {
    $group: {
      _id: "$ageGroup",
      totalUsers: { $sum: 1 },
      averageAge: { $avg: "$age" },
      users: { $push: "$name" }
    }
  },
  // Ordener les groups en ordre decroissante de quantité d'users
  {
    $sort: {
      totalUsers: -1
    }
  },
  // Affichage final avec les noms d'users
  {
    $project: {
      _id: 0,
      case: "$_id",
      totalUsers: "$totalUsers",
      ageMoyenne: { $round: ["$averageAge", 1] },
      noms: "$users"
    }
  }
])