const mongo = require('mongoose')

let langModel = mongo.Schema({
    langName: String
})

module.exports = mongo.model("langModel", langModel)