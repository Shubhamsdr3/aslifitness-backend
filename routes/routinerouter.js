const express = require('express');
const router = express.Router()
const userRoutine = require('../data/routine');
const { model } = require('mongoose');
const sendNotification = require('../fcm/fcmcloud')
const notification = require('../data/notification')

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

// send a reminder notification.
router.post('/:userId/routine/reminder', async function(req, resp) {
    try {
        notification.userId = req.params.userId
        notification.token = req.body.token
        notification.title = req.body.title
        notification.message = req.body.message
        notification.deeplinkUrl = req.body.deeplinkUrl,
        notification.scheduledTime = req.body.scheduledTime
        sendNotification(notification, function success(messageId) {
            resp.status(200).json({"is_success": true, "data": {"message": "Notification send succesfully", "messageId": messageId}})
        }, 
        function error(message) {
            resp.status(400).json({"is_success": false, "data": {"message": "Unable to send notification", "error": message}})
        }
    )    
    } catch(err) {
        console.log(err)
        resp.status(400).json({"is_success": false, "data": "Unable to send notification"})
    }
})

module.exports = router