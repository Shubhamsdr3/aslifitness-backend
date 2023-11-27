const express = require('express');
const router = express.Router()
const User = require('../data/user')
const homeData = require('../data/home');
const { model } = require('mongoose');

// get home data.
router.get('/home', (req, resp) => {
    resp.setHeader("Content-Type", "application/json");  
    resp.status(200).json(homeData)
})

module.exports = router