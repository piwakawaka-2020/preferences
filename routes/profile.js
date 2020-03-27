const express = require('express')

const router = express.Router()

const data = require('../data.json')

router.get('/:name', (req, res) => {
    const name = req.params.name
    const people = data.people.find(item => item.name === name)
    const viewData = {
        name: people.name,
        drink: people.drink,
        sugar: people.sugars,
        milk: people.milk,
        image: people.image
    }

    const template = 'views/partials/profile'
    res.render('partials/profile.hbs', viewData)
})





module.exports = router