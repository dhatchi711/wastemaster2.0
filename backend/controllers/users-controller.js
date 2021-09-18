const { v4: uuid } = require('uuid');
const HttpError = require('../models/http-error');
const {validationResult} = require('express-validator');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password');
    } catch (error) {
        const err = new HttpError('Fetching Users Failed.', 500);
    return next(err);
    }
    res.json({users: users.map(user => user.toObject({getters:true}))});
};
const signUp = async (req, res, next) => {
    const {name, email, password, items} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return next(
            new HttpError('Invalid inputs passed, please check your inputs', 422)        
        );
    }
    let existingUser;
    try {
        existingUser = await User.findOne({email: email});

    } catch (error) {
        const err = new HttpError(
            'Something went wrong, could not sign up.',
            500
        );
        return next(err);
    }

    if(existingUser){
        const err = new HttpError(
            'User exists already, please login instead.',
            422
        );
        return next(err);
    }

    const createdUser = new User ({
        name,
        email,
        image: 'https://www.gtlaw.com/-/media/images/team/p/person-philip-i/34485largepng.png',
        password,
        items
    });
    try {
        await createdUser.save();
    } catch (error) {
        const err = new HttpError(
            'Creating user failed, please try again',
            500
        );
        return next(err);
    }
    res.status(201).json({user: createdUser.toObject({getters:true})});
};
const login = async (req, res, next) => {
    const {email, password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email: email});
    } catch (error) {
        const err = new HttpError(
            'Something went wrong, could not log in.',
            500
        );
        return next(err);
    }
    if(!existingUser || existingUser.password !== password){
        const err = new HttpError(
            'Invalid Credentials, could not log in.', 401
        );
    }
    res.json({message: 'Logged In'});
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;