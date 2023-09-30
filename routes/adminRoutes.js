const { Router } = require('express');
const {
  getAllAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} = require('../controllers/adminController');

const router = Router();

router.route('/').get(getAllAdmins);

router.route('/:id').get(getAdmin).patch(updateAdmin).delete(deleteAdmin);

module.exports = router;
