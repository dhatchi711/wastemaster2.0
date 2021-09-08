const HttpError = require('../models/http-error');
const { v4: uuid } = require('uuid');
const {validationResult} = require('express-validator');

let DUMMY_ITEMS = [
    {
        id: 'p1',
        title: 'Compost Waste from Yesterday',
        description: 'Most amt of compost collected from yesterday',
        creator: 'u1'
    }
]

const getItemById = (req, res, next) => {
    const itemId = req.params.pid;
    const item = DUMMY_ITEMS.find(p => {
        return p.id === itemId;
    });

    if(!item){
        return next(new HttpError('Couldnt find an item for the provided itemID', 404));
    }

    res.json({item});
};

const getItemsByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const items = DUMMY_ITEMS.filter(p => {
        return p.creator === userId;
    });

    if(!items || items.length === 0){
        return next(new HttpError('Couldnt find items for the provided userID', 404));
    }

    res.json({items});
};

const createItem = (req, res, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your inputs', 422);
    }
    const { title, description, creator } = req.body;
    const createdItem = {
        id: uuid(),
        title: title,
        description: description,
        creator: creator
    };
    DUMMY_ITEMS.push(createdItem);
    res.status(201).json({item: createdItem});
};

const updateItem = (req, res, next) => {
    const { title, description } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your inputs', 422);
    }
    const itemId = req.params.pid;

    const updatedItem ={...DUMMY_ITEMS.find(p => p.id === itemId)};
    const itemIndex = DUMMY_ITEMS.findIndex(p => p.id === itemId);
    updatedItem.title = title;
    updatedItem.description = description;

    DUMMY_ITEMS[itemIndex] = updatedItem;
    res.status(200).json({item:updatedItem});
    
};

const deleteItem = (req, res, next) => {
    const itemId = req.param.pid;
    if(!DUMMY_ITEMS.find(p=> p.id === itemId)){
        throw new HttpError('Could not find that item.', 404);
    }
    DUMMY_ITEMS = DUMMY_ITEMS.filter(p=> p.id !== itemId);
    res.status(200).json({message: "Deleted Item"});

};

exports.getItemById = getItemById;
exports.getItemsByUserId = getItemsByUserId;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;