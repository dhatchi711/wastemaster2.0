const HttpError = require('../models/http-error');
const { v4: uuid } = require('uuid');
const {validationResult} = require('express-validator');
const Item = require('../models/item');

let DUMMY_ITEMS = [
    {
        id: 'p1',
        title: 'Compost Waste from Yesterday',
        description: 'Most amt of compost collected from yesterday',
        creator: 'u1'
    }
]

const getItemById = async (req, res, next) => {
    const itemId = req.params.pid;
    let item;
    try {
        item = await Item.findById(itemId);
    } catch (error) {
        const err = new HttpError(
            'Something went wrong, could not find item.',
            500
        );
        return next(err);
    }
    if(!item){
        return next(new HttpError('Couldnt find an item for the provided itemID', 404));
    }

    res.json({item: item.toObject( {getters: true})});
};

const getItemsByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    let items;
    try {
        items = await Item.find({creator: userId});
    } catch (error) {
        const err = new HttpError(
            'Something went wrong, could not fetch item.',
            500
        );
        return next(err);
    }

    if(!items || items.length === 0){
        return next(new HttpError('Couldnt find items for the provided userID', 404));
    }

    res.json({items: items.map(item => item.toObject({getters: true}) )});
};

const createItem = async (req, res, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your inputs', 422);
    }
    const { title, description, creator } = req.body;
    const createdItem = new Item({
        title,
        description,
        image: 'https://www.gardeningknowhow.com/wp-content/uploads/2014/05/compost-pile.jpg',
        creator
    });
    try {
        await createdItem.save();

    } catch (error) {
        const err = new HttpError(
            'Creating Item failed, please try again',
            500
        );
        return next(err);
    }
    res.status(201).json({item: createdItem});
};

const updateItem = async (req, res, next) => {
    const { title, description } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your inputs', 422);
    }
    const itemId = req.params.pid;
    let item;
    try{
        item = await Item.findById(itemId);
    }
    catch(error){
        const err = new HttpError(
            'Something went wrong, could not update item', 500
        );
        return next(err);
    }

    item.title = title;
    item.description = description;

    try{
        await item.save();
    }
    catch (error){
        const err = new HttpError(
            'Something went wrong, could not update item', 500
        );
        return next(err);
    }
    res.status(200).json({item:item.toObject({getters:true})});
};

const deleteItem = async (req, res, next) => {
    const itemId = req.param.pid;
    let item;
    try {
        item = await Item.findById(itemId);
    } catch (error) {
        const err = new HttpError(
            'Something went wrong, could not find item.',
            500
        );
        return next(err);
    }
    try {
        await Item.deleteOne(item);
    } catch (error) {
        const err = new HttpError(
            'Something went wrong, could not delete item.',
            500
        );
        return next(err);
    }
    res.status(200).json({message: "Deleted Item"});
};

exports.getItemById = getItemById;
exports.getItemsByUserId = getItemsByUserId;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;