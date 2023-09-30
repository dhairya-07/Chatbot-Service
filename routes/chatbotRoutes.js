const { Router } = require('express');
const { protect } = require('../controllers/auth');
const {
  getAllBots,
  getBot,
  createBot,
  updateBot,
  deleteBot,
} = require('../controllers/ChatBotController');

const router = Router();

router.route('/').get(getAllBots);
router.route('/userId').post(protect, createBot);

router
  .route('/:id')
  .get(getBot)
  .patch(protect, updateBot)
  .delete(protect, deleteBot);

module.exports = router;
