const express = require('express');
const fitnessRouter = express.Router()
const FitnessCenter = require('../data/fitnesscenter')

// create center
fitnessRouter.post('/create-center', async function(req, resp) {
    try {
        const vendorData = await FitnessCenter.findOne({'vendor_id': req.body.vendor_id})
        if(!vendorData) { 
            const fitnessCenter = new FitnessCenter({
                vendor_id: req.body.vendor_id,
                logo: req.body.logo,
                business_email: req.body.business_email,
                contact_number: req.body.contact_number,
                address: req.body.address,
                pincode: req.body.pincode,
                location: req.body.location,
                location: {
                    type: "Point",
                    coordinates: [parseFloat(req.body.latitude), parseFloat(req.body.longitude)]
                }
            });
            const fitnessCenterData = await fitnessCenter.save();
            resp.status(200).json({"is_success": true, "data": fitnessCenterData})
        } else {
            resp.status(200).json({"is_success": false, "message": "Vendo already exist"});
        }
    } catch(err) {
        console.log(err);
        resp.status(400).json({"is_success": false, "message": err.message});
    }
})

module.exports = fitnessRouter;