const express = require('express');
const itemControllers = require('../controllers/places-controller');

const router = express.Router();

const DUMMY_ITEMS = [
    {
        id: 'p1',
        title: 'Compost Waste from Yesterday',
        description: 'Most amt of compost collected from yesterday',
        creator: 'u1'
    }
]

router.get('/:pid', itemControllers.getItemById);

router.get('/user/:uid', itemControllers.getItemByUserId);

router.post('/', itemControllers.createItem);

module.exports = router;