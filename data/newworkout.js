const mongoose = require('mongoose');

const newWorkout = new mongoose.Schema({
    userId: { type: String, required: true},
    createdAt: {type: Number, required: true},
    setData: [
         {
            workout_id: Number,
            image: String,
            title: String,
            sub_title: String,
            sets: [
                {
                    weight_in_kg: Number,
                    reps_count: Number,
                    is_done: Boolean
            }
        ]
         }
    ]}, {collection: "workouts"});

module.exports = mongoose.model('NewWorkout', newWorkout); 