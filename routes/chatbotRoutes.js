const { Router } = require('express');
const {
  getAllBots,
  getBot,
  createBot,
  updateBot,
  deleteBot,
} = require('../controllers/ChatBotController');

const router = Router();

router.route('/').get(getAllBots).post(createBot);

router.route('/:id').get(getBot).patch(updateBot).delete(deleteBot);

module.exports = router;
