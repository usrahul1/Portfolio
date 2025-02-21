const mongo = require('mongoose')

let frameworkModel = mongo.Schema({
    frameName: String
})

module.exports = mongo.model("frameworkModel", frameworkModel)