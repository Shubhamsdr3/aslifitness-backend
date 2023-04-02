const express = require('express');
const router = express.Router()
const userRoutine = require('../data/routine');
const { model } = require('mongoose');

// get user routine.
router.get('/:userId/routine', async function(req, resp) {
    try {
        let userId = req.params.userId
        const { page = 1, limit = 3 } = req.query;
        console.log("Getting routine for user: " + userId)
        // const userRoutine = await Routine.findById(userId)
        resp.setHeader("Content-Type", "application/json");
        resp.status(200).json(userRoutine)
    } catch(err) {
        console.log(err)
        resp.status(404).json({"is_success": false, "message": "User not found"})
    }
})

module.exports = router