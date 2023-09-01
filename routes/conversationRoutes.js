const { Router } = require('express');
const {
  getAllChats,
  getChat,
  createChat,
  sendMessage,
  updateChat,
  deleteChat,
} = require('../controllers/ConversationController');

const router = Router();

router.route('/:botId/conversations').get(getAllChats).post(createChat);

router.route('/:botId/:conversationId').post(sendMessage);

router
  .route('/:conversationId')
  .get(getChat)
  .patch(updateChat)
  .delete(deleteChat);

module.exports = router;
