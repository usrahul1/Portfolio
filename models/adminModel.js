const mongo = require('mongoose')

let adminSchema = mongo.Schema({
    name: String,
    password: String
})

module.exports = mongo.model("admin", adminSchema)