const newAddWorkout = {
	"status_code": 200,
	"is_success": true,
	"data": {
		"image": "",
		"header": "Ab Scissors",
		"sub_header": "",
		"sets": [
			{
				"column1": "SET",
				"column2": "PREVIOUS",
				"column3": "REPS",
				"is_done": false
			}
		],
		"ctas": [
			{
			"text": "Add Set",
			"icon": "",
			"action": "ADD_WORKOUT"
		},
		{
			"text": "Add Exercise",
			"icon": "",
			"action": "ADD_EXERCISE"
		},
		{
			"text": "Discard Workout",
			"icon": "",
			"action": "DISCARD_WORKOUT"
		}
		]
	}
}

module.exports = newAddWorkout;