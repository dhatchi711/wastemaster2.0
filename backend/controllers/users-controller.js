const { v4: uuid } = require('uuid');
const HttpError = require('../models/http-error');
const {validationResult} = require('express-validator');


const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Deepak Tech',
        email: 'awesomedeesudar123@gmail.com',
        password: 'SuDar123'
    }
];


const getUsers = (req, res, next) => {
    res.json({users: DUMMY_USERS});
};
const signUp = (req, res, next) => {
    const {name, email, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your inputs', 422);
    }

    if(DUMMY_USERS.find(u => u.email === email)){
        throw new HttpError('User already exists. Please Log In', 422)

    }
    const createdUser = {
        id: uuid(),
        name,
        email,
        password
    };
    DUMMY_USERS.push(createdUser);
    res.status(201).json({user: createdUser});


};
const login = (req, res, next) => {
    const {email, password} = req.body;
    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if (!identifiedUser || identifiedUser.password !== password){
        throw new HttpError('Could not identify user', 401)
    }
    res.json({message: 'Logged In'});

};


exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;