const { Router } = require('express');
const {
  getAllEndUsers,
  getEndUser,
  createEndUser,
  updateEndUser,
  deleteEndUser,
} = require('../controllers/endUserController');

const router = Router();

router.route('/').get(getAllEndUsers).post(createEndUser);

router.route('/:id').get(getEndUser).patch(updateEndUser).delete(deleteEndUser);

module.exports = router;
