const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logoutUser, deleteItem, editItem, fetchDetails } = require('../controllers/authControls')
const middle = require('../middleware/isLoggedIn')
const langData = require('../data-adders/langdata')
const fwD = require('../data-adders/fw-data')
const certif = require('../data-adders/certif-data')
const proj = require('../data-adders/proj-data')
const title = require('../data-adders/title-data')
const upload = require('../config/multer-config')
const certifModel = require('../models/certificationsModel')
const fwModel = require('../models/frameworksModel')
const langModel = require('../models/languagesModel')
const projModel = require('../models/projectModel')
const titleModel = require('../models/titlesModel')

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

router.get("/prof", middle, async (req, res) => {
    let note = req.flash("note");
    let error = req.flash("error")

    let titleArray = await titleModel.find({}).lean()
    let certifArray = await certifModel.find({}).lean()
    let projArray = await projModel.find({}).lean()
    let fwArray = await fwModel.find({}).lean()
    let langArray = await langModel.find({}).lean()

    console.log(titleArray)

    res.render("adminIndex", {
        dataType: null,
        note,
        error,
        titleArray,
        certifArray,
        fwArray,
        langArray,
        projArray
    });
});

router.get("/new", async (req, res) => {
    const type = req.query.type
    let note = req.flash("note");
    let error = req.flash("error")

    let titleArray = await titleModel.find({}).lean()
    let certifArray = await certifModel.find({}).lean()
    let projArray = await projModel.find({}).lean()
    let fwArray = await fwModel.find({}).lean()
    let langArray = await langModel.find({}).lean()

    if (!req.query.type) {
        return res.redirect("/prof");
    }

    res.render("adminIndex", {
        dataType: type,
        note,
        error,
        titleArray,
        certifArray,
        fwArray,
        langArray,
        projArray
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

router.get('/delete', deleteItem)

router.get('/edit', fetchDetails)

router.post('/edit', upload.single('formPhoto'), async (req, res) => {
    try {
        await editItem(req, res);
    } catch (error) {
        console.error("Error in edit route:", error); // Log error for debugging
        res.status(500).send({ message: "Error in edit route", error: error.toString() });
    }
});


router.post('/logout', logoutUser)

module.exports = router