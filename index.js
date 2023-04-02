const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());

const userRouter = require('./routes/userrouter')
app.use('/api/user', userRouter);

const userProfile = require('./routes/workoutrouter')
app.use('/api', userProfile);

const workout = require('./routes/workoutrouter')
app.use('/api/workout', workout)

const homeRoute = require('./routes/homerouter')
app.use('/api', homeRoute)

//create fitness center
const fitnessRouter = require('./routes/createcenter')
app.use('/api', fitnessRouter)

// get all the fitness center
const vendorRouter = require('./routes/bussinesslist')
app.use('/api', vendorRouter)

// user routine
const userRoutine = require('./routes/routinerouter')
app.use('/api', userRoutine)

//Connecting to DB
mongoose.connect('mongodb://localhost:27017/aslifitness', {
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 1000,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
    function (err, res) {
        try {
            console.log('Connected to Database');
        } catch (err) {
            console.log(err);
        }
    } 
);

app.listen(3000, () => console.log('Listening on Port 3000'));
