const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/AdminData")
  .then(() => console.log("Connected!"))
  .catch((err) => console.log("Error", err));

const AdminUser = new mongoose.Schema({
  FirstName: {
    type: String,
    require: true,
  },
  LastName: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    unique: true,
    require: true,
  },
  Password: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("userData", AdminUser);
