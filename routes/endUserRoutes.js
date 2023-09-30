const { Router } = require('express');
const {
  getAllEndUsers,
  getEndUser,
  updateEndUser,
  deleteEndUser,
} = require('../controllers/endUserController');

const router = Router();

router.route('/').get(getAllEndUsers);

router.route('/:id').get(getEndUser).patch(updateEndUser).delete(deleteEndUser);

module.exports = router;
