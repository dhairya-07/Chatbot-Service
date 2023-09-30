const catchAsync = require('../utils/catchAsync');
const { User } = require('../models');
const shortid = require('shortid');

const getAllEndUsers = catchAsync(async (req, res, next) => {
  const endUsers = await User.findAll({
    where: { role: 'endUser' },
  });
  return res.status(200).json({
    status: 'Success',
    endUsers,
  });
});

const getEndUser = catchAsync(async (req, res, next) => {
  const endUser = await User.findOne({ userId: req.params.id });

  if (!endUser) {
    return res.status(400).json({
      status: 'Fail',
      msg: 'No user found with this id',
    });
  }

  return res.status(200).json({
    status: 'Success',
    endUser,
  });
});

const updateEndUser = catchAsync(async (req, res, next) => {
  const endUser = await User.findOne({ userId: req.params.id });

  if (!endUser) {
    return res.status(400).json({
      status: 'Fail',
      msg: 'No end user found with this id',
    });
  }

  endUser.username = req.body.username;
  await endUser.save();
  return res.status(200).json({
    status: 'Success',
    endUser,
  });
});

const deleteEndUser = catchAsync(async (req, res, next) => {
  const endUser = await User.findOne({ userId: req.params.id });

  if (!endUser) {
    return res.status(400).json({
      status: 'Fail',
      msg: 'No end user found with this id',
    });
  }

  await endUser.destroy();
  return res.status(200).json({
    status: 'Success',
  });
});

module.exports = {
  getAllEndUsers,
  getEndUser,
  updateEndUser,
  deleteEndUser,
};
