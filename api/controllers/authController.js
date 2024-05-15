import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();
    res.status(201).json("User Created Sucessfully!");
  } catch (error) {
    next(error);
  }
};
