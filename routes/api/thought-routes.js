const router = require('express').Router();
const {
    getAllThoughts,
    createThought,
    getThoughtById
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:id
router.route('/:id').get(getThoughtById);


module.exports = router;