const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render("index")
})

router.get('/projects', (req, res) => {
    res.render("projectPage")
})

router.get('/contact', (req, res) => {
    res.render("contactPage")
})

module.exports = router