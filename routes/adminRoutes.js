const { Router } = require('express');
const {
  getAllAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} = require('../controllers/adminController');

const router = Router();

router.route('/').get(getAllAdmins).post(createAdmin);

router.route('/:id').get(getAdmin).patch(updateAdmin).delete(deleteAdmin);

module.exports = router;
