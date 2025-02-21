const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logoutUser } = require('../controllers/authControls')
const middle = require('../middleware/isLoggedIn')
const langData = require('../data-adders/langdata')
const fwD = require('../data-adders/fw-data')
const certif = require('../data-adders/certif-data')
const proj = require('../data-adders/proj-data')
const title = require('../data-adders/title-data')
const upload = require('../config/multer-config')

router.get("/register", (req, res) =>{
    res.render("adminRegister")
})

router.post("/register", registerUser)

router.get("/login", (req, res)=>{
    let note = req.flash("note");
    let error = req.flash("error")
    res.render("adminLogin", { note, error })
})

router.post("/login", loginUser)

router.get("/prof", middle, (req, res) => {
    let note = req.flash("note");
    let error = req.flash("error")
    res.render("adminIndex", {
        dataType: null,
        note,
        error 
    });
});

router.get("/new", (req, res) => {
    const type = req.query.type
    let note = req.flash("note");
    let error = req.flash("error")

    if (!req.query.type) {
        return res.redirect("/prof");
    }

    res.render("adminIndex", {
        dataType: type,
        note,
        error
    });

})

router.post('/new', upload.single('formPhoto'), (req, res) => {
    const type = req.query.type
    if (type == 'project'){
        try {
            return proj(req, res)
        } catch (error) {
            req.flash("error", "Error uploading")
            res.redirect("/admin/prof")
        }
    } else if(type == 'title'){
        try {
            return title(req, res)
        } catch (error) {
            req.flash("error", "Error uploading")
            res.redirect("/admin/prof")
        } 
    } else {
        switch(type) {
            case 'langs':
                return langData(req, res)
            case 'fw':
                return fwD(req, res)
            case 'certif':
                return certif(req, res)
        }
    }
})

router.post('/logout', logoutUser)

module.exports = router