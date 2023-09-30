const catchAsync = require('../utils/catchAsync');
const { Chatbot } = require('../models');
const { User } = require('../models');

const getAllBots = catchAsync(async (req, res, next) => {
  const bots = await Chatbot.findAll({
    include: [
      {
        model: User,
        attributes: ['username', 'role'], // Specify the attributes you want
      },
    ],
    attributes: { exclude: ['userId'] },
  });

  return res.status(200).json({
    status: 'Success',
    bots,
  });
});

const createBot = catchAsync(async (req, res, next) => {
  const { name, userId } = req.body;

  // const user = await User.findOne(req.params.userId);
  // if (user.role !== 'admin') {
  //   return res
  //     .status(403)
  //     .json({ msg: 'You are not authorized to perform this action' });
  // }
  if (req.user.role !== 'admin')
    return res.status(403).json({
      msg: 'You are not authorized to perform this action',
    });

  const newBot = await Chatbot.create({
    name,
    userId,
  });
  return res.status(201).json({
    status: 'Success',
    newBot,
  });
});

const getBot = catchAsync(async (req, res, next) => {
  const bot = await Chatbot.findOne({ name: req.params.name });

  if (!bot) {
    return res.status(400).json({ msg: 'No bot found with this id' });
  }

  return res.status(200).json({
    status: 'Success',
    bot,
  });
});

const updateBot = catchAsync(async (req, res, next) => {
  const bot = await Chatbot.findOne({ name: req.params.name });

  if (!bot) {
    return res.status(400).json({ msg: 'No bot found with this id' });
  }

  if (bot.userId !== req.user.userId) {
    return res.status(403).json({
      msg: 'You are not authorized to perform this action',
    });
  }

  bot.name = req.body.name;
  await bot.save();

  return res.status(200).json({
    status: 'Sucess',
    bot,
  });
});

const deleteBot = catchAsync(async (req, res, next) => {
  const bot = await Chatbot.findOne({ name: req.params.name });

  if (!bot) {
    return res.status(400).json({
      msg: 'No bot found with this id',
    });
  }

  if (bot.userId !== req.user.userId) {
    return res.status(403).json({
      msg: 'You are not authorized to perform this action',
    });
  }

  await bot.destroy();
  return res.status(200).json({ status: 'Success' });
});

module.exports = {
  getAllBots,
  getBot,
  createBot,
  updateBot,
  deleteBot,
};
