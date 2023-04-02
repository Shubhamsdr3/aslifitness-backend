const newAddWorkout = {
	"status_code": 200,
	"is_success": true,
	"data": {
		"set_data": {
			"image": "",
			"title": "Ab Scissors",
			"sub_title": "",
			"sets": [
				{
					"weight_in_kg": 20,
					"reps_count": 10,
					"is_done": false
				}
		    ],
		    "add_set_cta":{
			"text": "Add Set",
			"icon": "",
			"action": "ADD_WORKOUT"
			}
		},
		"add_workout_cta": {
			"text": "Add Exercise",
			"icon": "",
			"action": "ADD_EXERCISE"
		},
		"history": null,
		"cta": null
	}
}

module.exports = newAddWorkout;