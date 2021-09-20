const HttpError = require('../models/http-error');
const mongoose = require('mongoose');
const {validationResult} = require('express-validator');
const Item = require('../models/item');
const User = require('../models/user');


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

    let user;
    try {
        user = await User.findById(creator);
    } catch (error) {
        const err = new HttpError(
            'Creating Item failed, please try again',
            500
        );
        return next(err);
    }
    if(!user){
        const err = new HttpError('Could not find user for id.', 404);
        return next(err);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdItem.save({session: sess});
        user.items.push(createdItem);
        await user.save({session: sess});
        await sess.commitTransaction();
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
        return next(
            new HttpError('Invalid inputs passed, please check your inputs', 422)        
        );
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
    const itemId = req.params.pid;
    let item;
    try {
        item = await Item.findById(itemId).populate('creator');
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete test.',
        500
      );
      return next(error);
    }

    if (!item) {
      const error = new HttpError('Could not find item for this id.', 404);
      return next(error);
    }
  
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await item.remove({session: sess});
        item.creator.items.pull(item);
        await item.creator.save({session:sess});
        await sess.commitTransaction();
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