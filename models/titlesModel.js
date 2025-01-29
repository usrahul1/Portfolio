const mongo = require('mongoose')

let titleModel = mongo.Schema({
    titleName: String,
    titleDesc: String,
    titleYear: Date
})

module.exports = mongo.model("titlemodel", titleModel)