const mongoose = require('mongoose');

const fitnessCenterSchema = new mongoose.Schema({
    vendor_id: { type:String,required: true},
    logo: { type: String },
    bussiness_email: { type: String},
    contact_number: { type: String },
    address: { type: String },
    pincode: {type: String},
    location: { type: {type: String, required: true}, coordinates: [] }
}, {collection:'fitness_centers'});

fitnessCenterSchema.index({location: "2dSphere"})
module.exports = mongoose.model('Vendor', fitnessCenterSchema);
