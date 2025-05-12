db = connect('mongodb://localhost:27017/basikondb');
db.users.aggregate([
  { $match: { name: "Eduardo" } },
  { $group: { _id: "$name", ageSum: { $sum: "$age" } } }
]);

