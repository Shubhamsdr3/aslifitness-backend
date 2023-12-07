const userRoutineWeekly = {
	"status_code": 200,
	"is_success": true,
	"data": {
		"header": "Sunday, 5/03/2023",
		"sub_header": "",
		"currentMonth": {
			"month": 2,
			"year": 2023,
			"routines": [
                {
					"type": "INTESE",
					"date": 1,
					"labels": [
                        {
							"name": "Shoulder",
							"color": "#16A085"

						},
						{
							"name": "Legs",
							"color": "#EC7063"
						}
					]
				},
				{
					"type": "INTESE",
					"date": 3,
					"labels": [
                        {
						"name": "Cardio",
						"color": "#873600"
                    },
                ]
				},
				{
					"type": "INTESE",
					"date": 4,
					"labels": [
                        {
						"name": "Arms",
                        "color": "#873600"
					}]
				},
				{
					"type": "INTESE",
					"date": 6,
					"labels": [{
							"name": "Arms",
							"color": "#E6B0AA"
						},
						{
							"name": "Cardio",
							"color": "#CB4335"

						}
					]
				}
			]
		}
	}
}
// month 0 -> Jan...Dec-11
module.exports = userRoutineWeekly