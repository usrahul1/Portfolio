const jwt = require("jsonwebtoken")

const middle = async (req, res, next) => {
    if(!req.cookies.token) {
        req.flash("error", "Login First!")
        return res.redirect("/admin/login")
    }
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY)
        console.log(decoded)
        next()
    } catch (error) {
        req.flash("error", "Oopsie!")
        return res.redirect("/admin/login")
    }
}
module.exports = middle