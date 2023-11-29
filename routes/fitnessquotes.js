const express = require('express');
const vendorRouter = express.Router()
const axios = require('axios');
const e = require('express');

vendorRouter.get('/fitness-quotes', async function(req, res){
    try {
        axios.get('https://api.api-ninjas.com/v1/quotes?category=fitness', {
            'method': 'GET',
            'headers': {
                'X-API-KEY': 'nYa2yYMlwWbaLQeGgKetQA==nYSJLGyhGqWtE7hv',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response.data)
            res.status(200).json({"is_success": true, "data": response.data})
        })
        .catch(error => {
            console.log(error);
            res.status(200).json({"is_success": false, "message": error.message})
        })
    } catch(err) {
        console.log(err)
        res.status(200).json({"is_success": false, "message": err.message})
    }
})

module.exports = vendorRouter