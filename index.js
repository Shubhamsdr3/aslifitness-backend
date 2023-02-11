const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

const userRouter = require('./routes/userrouter')
app.use('/api/user', userRouter);

const userProfile = require('./routes/workoutrouter')
app.use('/api', userProfile);

const workout = require('./routes/workoutrouter')
app.use('/api', workout)

const homeRoute = require('./routes/homerouter')
app.use('/api', homeRoute)

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
