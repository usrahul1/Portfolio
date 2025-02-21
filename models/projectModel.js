const mongo = require('mongoose')

let projectSchema = mongo.Schema({
    image: String,
    projectTitle: String,
    projDesc: String,
    githubLink: String
})

module.exports = mongo.model("project", projectSchema)  