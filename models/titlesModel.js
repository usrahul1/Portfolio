const mongo = require('mongoose')

let titleModel = mongo.Schema({
    titleName: String,
    titleDesc: String,
    titleYear: Date,
    titleImg: String
})

module.exports = mongo.model("titlemodel", titleModel)