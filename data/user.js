const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type:String,required: true},
    name: { type: String},
    email: { type: String},
    phoneNumber: { type: String },
    profileImage: { type: String },
    weight: { type: Number },
    age: { type: Number },
}, {collection:'users'});

module.exports = mongoose.model('User', userSchema);