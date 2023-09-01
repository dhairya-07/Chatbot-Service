const catchAsync = require('../utils/catchAsync');
const { Conversation, Message, User, Chatbot } = require('../models');
const shortid = require('shortid');

const getAllChats = catchAsync(async (req, res, next) => {
  const { botId } = req.params;
  const chats = await Conversation.findAll({
    where: { chatbotId: botId },
    include: [
      {
        model: User,
        attributes: ['username', 'role'],
      },
      {
        model: Chatbot,
        attributes: ['name'],
      },
    ],
    attributes: { exclude: ['chatbotId', 'userId'] },
    order: [['createdAt', 'DESC']],
  });
  return res.status(200).json({
    status: 'Success',
    total_chats: chats.length,
    chats,
  });
});

const createChat = catchAsync(async (req, res, next) => {
  const { botId } = req.params;
  const { userId } = req.body;

  const conversationId = shortid();
  const newChat = await Conversation.create({
    conversationId,
    chatbotId: botId,
    userId,
  });
  return res.status(201).json({
    msg: 'New chat created',
    chat: newChat,
  });
});

const sendMessage = catchAsync(async (req, res, next) => {
  const { conversationId } = req.params;

  const { message, senderType } = req.body;

  const conversation = await Conversation.findOne({
    where: {
      conversationId,
    },
  });

  if (!conversation) {
    return res.status(400).json({ msg: 'No conversations found with this id' });
  }

  if (conversation.isCompleted) {
    return res.status(400).json({
      msg: 'This conversation is completed! You cannot send anymore messaged to it. Please create a new conversation or mark it not complete by making a patch request with {isCompleted:false }',
    });
  }

  const newMessage = await Message.create({
    message,
    senderType,
    conversationIdFK: conversationId,
  });

  return res.status(200).json({
    status: 'Success',
    msg: 'Message sent successfully',
    newMessage,
  });
});

const getChat = catchAsync(async (req, res, next) => {
  const { conversationId } = req.params;
  const chat = await Conversation.findOne({
    where: { conversationId },
    include: [
      {
        model: Message,
      },
    ],
    order: [['createdAt', 'DESC']],
  });

  if (!chat) {
    return res.status(400).json({ msg: 'No chat found with this id' });
  }

  const messages = await Message.findAll({
    where: { conversationIdFK: chat.conversationId },
    attributes: ['message', 'senderType', 'createdAt'],
    order: [['createdAt', 'DESC']],
  });
  chat.Messages.push(...messages);

  return res.status(200).json({
    status: 'Success',
    chat,
  });
});

const updateChat = catchAsync(async (req, res, next) => {
  const { conversationId } = req.params;
  const chat = await Conversation.findOne({
    where: { conversationId },
  });

  if (!chat) {
    return res.status(400).json({ msg: 'No chat found with this id' });
  }
  console.log(req.body.isCompleted);
  chat.isComplete = req.body.isCompleted;
  await chat.save();

  return res.status(200).json({
    status: 'Sucess',
    chat,
  });
});

const deleteChat = catchAsync(async (req, res, next) => {
  const { conversationId } = req.params;
  const chat = await Conversation.findOne({
    where: { conversationId },
  });

  if (!chat) {
    return res.status(400).json({
      msg: 'No chat found with this id',
    });
  }

  await chat.destroy();
  return res.status(200).json({ status: 'Success' });
});

module.exports = {
  getAllChats,
  getChat,
  createChat,
  sendMessage,
  updateChat,
  deleteChat,
};
