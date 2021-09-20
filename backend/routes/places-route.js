const express = require('express');
const itemControllers = require('../controllers/places-controller');
const {check} = require('express-validator');
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

router.get('/user/:uid', itemControllers.getItemsByUserId);

router.post('/', [check('title').not().isEmpty(), check('description').isLength({min:5})],itemControllers.createItem);



router.patch("/:pid", [check('title').not().isEmpty(), check('description').isLength({min:5})], itemControllers.updateItem);
router.delete("/:pid", itemControllers.deleteItem);




module.exports = router;