const catchAsync = require('../utils/catchAsync');
const { User } = require('../models');
const shortid = require('shortid');

exports.getAllAdmins = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { role: 'admin' },
  });
  return res.status(200).json({
    status: 'Success',
    users,
  });
});

// exports.createAdmin = catchAsync(async (req, res, next) => {
//   const { username, password, role } = req.body;
//   const userId = shortid();
//   const newUser = await User.create({
//     userId,
//     username,
//     password,
//     role,
//   });
//   return res.status(201).json({
//     status: 'Success',
//     newUser,
//   });
// });

exports.getAdmin = catchAsync(async (req, res, next) => {
  const user = await User.findOne({
    userId: req.params.id,
  });

  if (!user) {
    return res.status(400).json({ msg: 'No user found with this id' });
  }

  return res.status(200).json({
    status: 'Success',
    user,
  });
});

exports.updateAdmin = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ userId: req.params.id });

  if (!user) {
    return res.status(400).json({ msg: 'No user found with this id' });
  }

  user.username = req.body.username;
  await user.save();

  return res.status(200).json({
    status: 'Sucess',
    user,
  });
});

exports.deleteAdmin = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ userId: req.params.id });

  if (!user) {
    return res.status(400).json({
      msg: 'No user found with this id',
    });
  }

  await user.destroy();
  return res.status(200).json({ status: 'Success' });
});
