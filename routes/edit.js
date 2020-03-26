const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/:name', (req, res) => {
    const view = 'partials/edit'

    fs.readFile('./data.json', 'utf8', (err, data) => {
        if(err) throw err
        const users = JSON.parse(data)
        const userName = req.params.name
        const currentUser = users.people.find(user => user.name === userName)
        
        const viewData = {
            name: currentUser.name,
            drink: currentUser.drink,
            sugars: currentUser.sugars,
            milk: currentUser.milk
        }
    
        res.render(view, viewData)
    })
})

router.post('/:name', (req, res) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) console.log('An error has occurred')

        const users = JSON.parse(data)
        users.people.forEach((user, index) => {
            if(req.params.name === user.name) {
                console.log(index)
                users.people[index] = {
                    name: req.body.name,
                    drink: req.body.drink,
                    sugars: Number(req.body.sugars),
                    milk: Number(req.body.milk)
                }
            }
        })
        
        const userJSON = JSON.stringify(users, null, 2)
        fs.writeFile('./data.json', userJSON, (err, _) => {
            if (err) console.log('An error has occurred')
        })
    })
    res.redirect(`/edit/${req.body.name}`)
})


module.exports = router