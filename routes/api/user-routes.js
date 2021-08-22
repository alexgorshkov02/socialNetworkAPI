const router = require('express').Router();
const {
    getAllUsers,
    createUser,
    getUserById
} = require('../../controllers/user-controller');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:id
router.route('/:id').get(getUserById);

module.exports = router;
