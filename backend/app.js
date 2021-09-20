const express = require('express');
const mongoose = require('mongoose');

const HttpError = require('./models/http-error');

const placesRoutes = require('./routes/places-route');
const usersRoutes = require('./routes/users-routes');

const app = express();

//body parsers for post request
app.use(express.json());

//Register Middleware
app.use('/api/places', placesRoutes);

app.use('/api/users', usersRoutes);


app.use((req, res, next) => {
    const error = new HttpError('Could not find the route.', 404);
    throw error;
});

app.use((error, req,res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error occurred."});
});

mongoose
    .connect('mongodb+srv://deepakWasteMaster:SuDar123@cluster0.ozp0r.mongodb.net/wastemaster?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });