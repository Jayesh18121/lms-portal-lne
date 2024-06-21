const express = require("express");
const { handleSignUp, handleLogin, handleLogout } = require("../controllers/userController");
const { auth } = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/register",auth,handleSignUp);
userRouter.post("/login",auth,handleLogin);
userRouter.post("/logout",auth,handleLogout);

module.exports = {userRouter};