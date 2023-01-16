const { Router } = require("express");

const authRouter = Router();

const jwt = require("jsonwebtoken");

const { RegistrationModel } = require("../models/register");

const bcrypt = require("bcrypt");

const saltRounds = 5;

authRouter.post("/register", async (req, res) => {
  const { name, email, password, gender } = req.body;
  if (name && email && password && gender) {
    const validateEmail = await RegistrationModel.findOne({ email: email });
    if (validateEmail) {
      res.status(400).send({
        message: "Your email address is already in use",
      });
    } else {
      try {
        bcrypt.hash(password, saltRounds, async (err, hash_password) => {
          if (err) {
            res.status(500).send({
              message: err.message,
            });
          } else {
            const newRegistration = new RegistrationModel({
              name,
              email,
              password: hash_password,
              age: gender,
            });
            await newRegistration.save();
            await res.status(201).send({
              message: "new registration successfully",
            });
          }
        });
      } catch (err) {
        res.status(500).send({
          message: err.message,
        });
      }
    }
  } else {
    res.status(500).send({
      message: "Please fill the required fields",
    });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const user = await RegistrationModel.find({ email });
      if (user.length > 0) {
        bcrypt.compare(password, user[0].password, (err, result) => {
          if (result) {
            const token = jwt.sign({ userId: user[0]._id }, "masai");
            res.status(201).send({
              message: "Login successful",
              token,
            });
          } else {
            res.status(401).send({
              message: "Wrong Password",
            });
          }
        });
      } else {
        res.status(401).send({
          message: "Email Address not found",
        });
      }
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  } else {
    res.status(500).send({
      message: "Please fill the required fields",
    });
  }
});

module.exports = {
  authRouter,
};
