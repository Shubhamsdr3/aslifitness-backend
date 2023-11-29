const express = require('express');
const router = express.Router()
const User = require('../data/user')
const homeData = require('../data/home');
const { model } = require('mongoose');
const firestoreDB = require('../init');
const { use } = require('./userrouter');
const userCollection = firestoreDB.collection("users")
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// get home data.
router.get('/home/:userId', async function(req, resp) {
    const userId = req.params.userId
    const userData = await userCollection.doc(userId).get()
    homeData.data.header = "Greeting, " + userData.data().name + "!"
    const date = new Date()
    let options = [{day: 'numeric'}, {month: 'numeric'}, {year: 'numeric'}];
    let joined = join(new Date, options, '-');
    homeData.data.sub_header = weekdays[date.getDay()] + ", " + joined
    homeData.data.user = userData.data()
    resp.setHeader("Content-Type", "application/json");  
    resp.status(200).json(homeData)
})

function join(date, options, separator) {
   function format(option) {
      let formatter = new Intl.DateTimeFormat('en', option);
      return formatter.format(date);
   }
   return options.map(format).join(separator);
}

module.exports = router