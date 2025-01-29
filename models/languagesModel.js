const mongo = require('mongoose')

let langModel = mongo.Schema({
    langName: String
})

module.exports = mongo.Model("langModel", langModel)