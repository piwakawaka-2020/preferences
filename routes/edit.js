const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/:name', (req, res) => {
    const view = 'partials/edit'

    fs.readFile('./data.json', 'utf8', (err, data) => {
        if(err) throw err
        const users = JSON.parse(data)
        const userName = req.params.name
        users.find(user => user.name === userName)
        
        const viewData = {
            name: userName,
            drink: users.drink,
            sugars: users.sugars,
            milk: users.milk
        }
    
        res.render(view, viewData)
    })
})


module.exports = router