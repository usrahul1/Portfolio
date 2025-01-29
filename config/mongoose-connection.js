const mongoose = require('mongoose')
const config = require('config')

mongoose
.connect(`${config.get("MONGODB_URI")}/portfolio`)
.then(() => {
    console.log("Connected to database.")
})
.catch(function(err){
    console.log(err)
})

module.exports = mongoose.connection