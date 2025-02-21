require('dotenv').config()

const express = require('express')
const expressLayout =  require('express-ejs-layouts')
const app = express()
const path = require('path')
const db = require('./config/mongoose-connection')
const flash = require('connect-flash')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(expressLayout)
app.set('layout','./layouts/main')
app.use(cookieParser())
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET
    })
)
app.use(flash())


const PORT = process.env.PORT

app.use('/', require('./routes/indexRouter'))
app.use('/admin', require('./routes/adminRouter'))

app.listen(PORT, () => console.log(`Running on port ${PORT}`))