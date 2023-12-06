const express = require('express');
const router = express.Router()
const User = require('../data/user')
const homeData = require('../data/home');
const { model } = require('mongoose');
const firestoreDB = require('../init');
const { use } = require('./userrouter');
const e = require('express');
const userCollection = firestoreDB.collection("users")
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// get home data.
router.get('/home', async function(req, resp) {
   resp.setHeader("Content-Type", "application/json");  
   let userId = req.query.uid
   console.log("UserId:" + userId)
   if(!userId || userId.trim().length == 0) {
      resp.status(200).json(homeData)
   } else {
      const userData = await userCollection.doc(userId).get()
      homeData.data.header = "Greeting, " + userData.data().name + "!"
      const date = new Date()
      let options = [{ day: 'numeric'}, { month: 'numeric'}, { year: 'numeric'}];
      let joined = join(new Date, options, '-');
      homeData.data.sub_header = weekdays[date.getDay()] + ", " + joined
      console.log(userData.data())
      homeData.data.user = userData.data()
      resp.status(200).json(homeData)
   }
})

function join(date, options, separator) {
   function format(option) {
      let formatter = new Intl.DateTimeFormat('en', option);
      return formatter.format(date);
   }
   return options.map(format).join(separator);
}

module.exports = router