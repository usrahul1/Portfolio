const jwt = require('jsonwebtoken')

module.exports.createToken = (admin) => {
    return jwt.sign({name: admin.name}, process.env.JWT_KEY)
}