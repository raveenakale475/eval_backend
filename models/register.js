const mongoose = require("mongoose");

const RegistrationForm = mongoose.Schema({
  name: String,
  email:String ,
  gender: String,
  password: String
});

const RegistrationModel = mongoose.model("user", RegistrationForm);

module.exports = {
  RegistrationModel,
};
