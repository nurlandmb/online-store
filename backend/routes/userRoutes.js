import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import { generateToken, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ phone: req.body.phone });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        phone: user.phone,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }
    res.status(401).send({ message: 'Invalid phone or password' });
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      id: user._id,
      name: user.name,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

userRouter.post(
  '/edit',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;
      if(req.body.newPassword){
        user.password = bcrypt.hashSync(req.body.newPassword, 8)
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser._name,
        phone: updatedUser.phone,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser)
      })
    }else{
      res.status(401).send({ message: 'User not found or password is wrong' })
    }
  })
);

export default userRouter;
