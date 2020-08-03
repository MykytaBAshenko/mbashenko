const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');
const isAuth = require('../util')

const userSchema = new mongoose.Schema({
  login: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

const userRoute = express.Router();

userRoute.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      login: 'mbashenko',
      password: 'Nika26032001'
    });
    const newUser = await user.save();
    res.send({msg: newUser});
  } catch (error) {
    res.send({ msg: error.message });
  }
});

const getToken = (user) => {
  return jwt.sign({
    _id: user._id,
    login: user.login
  },
  config.JWT_SECRET,
  {
    expiresIn: '48h'
  })
}


userRoute.put("/:id", isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.login = req.body.login;
    user.password = req.body.password;
    const updatedUser = await user.save();
    if (updatedUser) {
      return res.status(200).send({ message: 'user Updated' });
    }
  }
  return res.status(500).send({ message: ' Error in Updating user.' });
});

userRoute.post('/signin', async (req, res) => {
console.log(req.body)
  const signinUser = await User.findOne({
    login: req.body.login,
    password: req.body.password
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      login: signinUser.login,
      token: getToken(signinUser)
    })
  } else {
    res.status(401).send({ msg: 'Invalid Email or Password.' });
  }
})


module.exports = userRoute;


