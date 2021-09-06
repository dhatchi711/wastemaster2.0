const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-route');

const app = express();

//body parsers for post request
app.use(bodyParser.json());


//Register Middleware
app.use('/api/places', placesRoutes);
app.use((error, req,res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error occurred."});
});

app.listen(5000);