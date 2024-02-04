const mongoose = require("mongoose");

const password = encodeURIComponent("Sony@567"); // Encode the password
const connect = mongoose.connect(`mongodb+srv://mjerusha8:${password}@cluster0.xnjgihd.mongodb.net/yourdatabase`);

connect.then(() => {
  console.log("Connected to the database");
})
.catch((error) => {
  console.error("Error connecting to the database:", error);
});

const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Corrected model creation
const UserModel = mongoose.model("User", LoginSchema);

module.exports = UserModel;
