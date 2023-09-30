const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const { User } = require('../models');
const shortid = require('shortid');

const signToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });
  return token;
};

exports.createUser = catchAsync(async (req, res, next) => {
  const { username, password, role } = req.body;
  const userId = shortid();
  const newUser = await User.create({
    userId,
    username,
    password,
    role,
  });
  const payload = {
    username,
    userId,
    role,
  };
  const token = signToken(payload);

  // const cookieOptions = {
  //   httpOnly: true,
  //   secure: true,
  // };

  newUser.password = undefined;
  // return res.cookie('jwt', token, cookieOptions).redirect('/api/chatbot');
  return res.status(201).json({
    status: 'Success',
    newUser,
    token,
  });
});

// exports.login = catchAsync(async (req, res, next) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res
//       .status(400)
//       .json({ msg: 'Please provide username and password' });
//   }

//   const user = await User.findOne({ username });

//   if (!user || !user.validatePassword(password)) {
//     return res.status(403).json({ msg: 'Invalid username or password' });
//   }

//   const payload = {
//     userId: user.userId,
//     username: user.username,
//     role: user.role,
//   };
//   const token = signToken(payload);
//   return res.status(200).json({ status: 'success', token });
// });

exports.protect = catchAsync(async (req, res, next) => {
  var token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(403).json({ msg: 'You are not logged in!' });
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findOne({ userId: decoded.userId });

  if (!user) {
    return res.status(403).json({ msg: 'No user found with this token' });
  }
  req.user = user;
  next();
});
