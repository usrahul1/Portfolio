const express = require('express')
const certifModel = require('../models/certificationsModel')

module.exports = async (req, res) => {
    try {
        console.log(req.body)
        let certif = await certifModel.create({
            certifName: req.body.formTitle,
            yearOfCompletion: req.body.formYear
        })
       req.flash("note", "Certification added !")
       return res.redirect("/admin/prof") 
    } catch (error) {
        req.flash("error", "Oops !")
        return res.redirect("/admin/prof") 
    }
}