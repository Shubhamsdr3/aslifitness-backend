const mongoose = require('mongoose');

const nearbyVendorsSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    vendors: [
         {
            place_id: String,
            business_status: String,
            icon: String,
            name: String,
            opening_hours: { open_now: Boolean},
            photos: [
                {
                    height: Number,
                    width: Number,
                    photo_reference: String
            }
            ],
            rating: Number,
            user_ratings_total: String
         }
    ]}, {collection: "nearby_vendors"});

module.exports = mongoose.model('NearbyVendors', nearbyVendorsSchema); 