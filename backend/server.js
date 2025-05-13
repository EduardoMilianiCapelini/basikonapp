import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"
import UserModel from './user.model.js';

const app = express();
dotenv.config();

// Variables d'ambiance
const PORT = process.env.PORT;
const MONGOURL = process.env.MONGO_URL;

// Connexion avec MongoDB
mongoose.connect(MONGOURL).then(() => {
    console.log("Database connected !!!");
    app.listen(PORT, () => {
        console.log("Server running on port "+PORT);
    })
}).catch((error) => {
    console.log(error)
});

// Permet l'affichage de frontend/index.html on GET /
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'frontend')));

// Permet l'envoie de json on POST /users
app.use(express.json());

// API endpoints
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
  });

app.get("/users", async (req, res) => {
    try {
        const userData = await UserModel.find();
        res.json(userData);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})

app.post("/users", async(req, res) => {
    try{
        const user = await UserModel.create(req.body);
        res.status(200).json(user);
    } catch(error){
        res.status(500).json({message : error.message});
    }
})

app.get('/sumAges', async (req, res) => {
    try {
        const sum = await UserModel.aggregate([
            { $match: { name: "Eduardo" } },
            { $group: { _id: "$name", ageSum: { $sum: "$age" } } }
          ]);
      
        res.json(sum[0] || null);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
  });
