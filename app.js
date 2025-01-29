require('dotenv').config()

const express = require('express')
const expressLayout =  require('express-ejs-layouts')
const app = express()
const path = require('path')
const db = require('./config/mongoose-connection')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(expressLayout)
app.set('layout','./layouts/main')

const PORT = process.env.PORT

app.use('/', require('./routes/indexRouter'))
app.use('/admin', require('./routes/adminRouter'))

app.listen(PORT, () => console.log(`Running on port ${PORT}`))