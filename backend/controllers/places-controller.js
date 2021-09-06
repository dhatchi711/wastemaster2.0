const HttpError = require('../models/http-error');

const DUMMY_ITEMS = [
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

const getItemByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const item = DUMMY_ITEMS.find(p => {
        return p.creator === userId;
    });

    if(!item){
        return next(new HttpError('Couldnt find an item for the provided userID', 404));
    }

    res.json({item});
};

const createItem = (req, res, next) =>{
    
};

exports.getItemById = getItemById;
exports.getItemByUserId = getItemByUserId;