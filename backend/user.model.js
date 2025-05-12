import mongoose from "mongoose";

// Création du schema
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
}, {
    versionKey: false  //supprime __v du POST /users
  });

// Création du model
const UserModel = mongoose.model("users", UserSchema);

export default UserModel;