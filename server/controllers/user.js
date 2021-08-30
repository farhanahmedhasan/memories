import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: 'Success',
      results: users.length,
      users,
    });
  } catch (error) {
    res.status(400).json({ message: `Something Went Wrong. We couldn'tFind The Users` });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        message: "user doesn't exist",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: 'Invalid Credentials',
      });
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '2h' });

    res.status(200).json({
      message: 'success',
      result: existingUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something Went Wrong',
    });
  }
};

export const signup = async (req, res) => {
  const { FirstName, LastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already Exist' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password doesn't match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ name: `${FirstName} ${LastName}`, email, password: hashedPassword });

    const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '2h' });

    res.status(200).json({
      message: 'User Successfully Created',
      result,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something Went Wrong',
    });
  }
};
