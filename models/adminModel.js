const mongo = require('mongoose')

let adminSchema = mongo.Schema({
    password: String
})

module.exports = mongo.model("admin", adminSchema)