const express = require('express')
const titleModel = require('../models/titlesModel')

module.exports = async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.file)

        let title = await titleModel.create({
            titleImg: req.file.filename,
            titleName: req.body.formTitle,
            titleDesc: req.body.formDesc,
            titleYear: req.body.formYear
        })
        
        req.flash("note", "Title added !")
        return res.redirect("/admin/prof") 
    } catch (error) {
        req.flash("error", "Oops !")
        return res.redirect("/admin/prof") 
    }
}
