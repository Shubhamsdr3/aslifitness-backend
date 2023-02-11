const express = require('express');
const router = express.Router()
const User = require('../data/user')
const profileData = require('../data/userprofile')

// register
router.post('/register', (req, resp) => {
    // register things goes here.
});

// login
router.post('/login', (req, res) => {
    // login
});

// get profile data
router.get('/profile', (req, resp) => {
    resp.setHeader("Content-Type", "application/json");
    resp.status(200).json(profileData)
})

// get all users
router.get('/allUsers', async function(req, res) {
    try {
        const users = await User.find().exec();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
    }
});

// get user by id
router.get('/:userId', async function(req, res) {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch(err) {
        console.log(err);
        res.status(404).json({"message": "User not found"})
    }
})

//save user
router.post('/save', async function(req, res){
    const user = new User({
        userId: req.body.userId,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        userId: req.body.userId,
        profileImage: req.body.profileImage,
        weight: req.body.weight,
        age: req.body.age
    });
    try {
        await user.save();
        res.status(200).json({"success": true, "message":"User details saved"});
    } catch (err) {
        console.log(err);
        res.status(400).json({"success": false, "message":"Error in saving user details"});
    }
});

module.exports = router;