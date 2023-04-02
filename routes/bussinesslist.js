const express = require('express');
const vendorRouter = express.Router()
const User = require('../data/user');
const axios = require('axios');
const apiKey = "AIzaSyB-F0uSNWmPFZZqbu8b35P_eHPkd0l6EWc"

const NearbyVendors = require('../data/nearbyvendors');
const e = require('express');

// get all centers.
// 1. Get the all local fitness centers with 500m radius.
// 2. save them so that you don't have to make api call for every request.
vendorRouter.post('/fitness-centers', async function(req, resp) {
  try {
    const userId = req.body.userId
    const currentLocation = req.body.location
    const userData = await User.findOne({ 'userId': userId })
    console.log("Current user data: " + userData);
    let userLocation = userData.location;
    if(userLocation && userLocation.coordinates != 'undefined' && Array.isArray(userLocation.coordinates) && userLocation.coordinates.length > 1) {
      if(currentLocation.latitude != userLocation.coordinates[0] || currentLocation.longitude != userLocation.coordinates[1]) {
        console.log("Location has been changed....");
        fetchNearbyVendors(userId, currentLocation, resp)       
      } else {
        const savedVendors = await NearbyVendors.findOne({'userId': userId })
        if(savedVendors) {
          const userLocation = new NearbyVendors({
            userId: savedVendors.userId,
            vendors: savedVendors.vendors
          })
          console.log("Sending data from data base..." + userLocation);
          resp.status(200).json({"is_success": true, "data": userLocation})
        } else {
          console.log("Fetching data from places api...");
          fetchNearbyVendors(userId, currentLocation, resp)
        }
    }   
  } else {
    console.log("User location is not exist...");
    fetchNearbyVendors(userId, currentLocation, resp)
  }
 } catch(err) {
    console.log(err)
    resp.status(200).json({"is_success": false, "message": err.message});
  }
})

async function fetchNearbyVendors(userId, currentLocation, resp) {
  axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + currentLocation.latitude + ',' + currentLocation.longitude + '&radius=500&types=gym&key=' + apiKey)
        .then(response => {
          processResponse(userId, response.data, resp);
        })
        .catch(error => {
          console.log(error);
          resp.status(200).json({"is_success": false, "message": error.message});
        }
    );
}

async function processResponse(userId, locationData, resp) {
  try {
    console.log("Saving response from places api...")
    const nearbyVendors = new NearbyVendors({
      userId: userId,
      vendors: locationData.results
    });
    const savedVendors = await nearbyVendors.save();
    resp.status(200).json({"is_success": true, "data": savedVendors})
  } catch(err) {
    console.log(err)
    resp.status(200).json({"is_success": false, "message": err.message})
  }
}

module.exports = vendorRouter