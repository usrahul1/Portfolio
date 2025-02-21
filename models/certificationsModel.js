const mongo = require('mongoose')

let certifSchema = mongo.Schema({
    certifName: String,
    yearOfCompletion: Date
})

module.exports = mongo.model("certif", certifSchema)