const express = require('express')
const langModel = require('../models/languagesModel')

module.exports = async (req, res) => {
    try {
        let lang = await langModel.create({
            langName: req.body.formTitle
        })
       req.flash("note", "Language added !")
       return res.redirect("/admin/prof") 
    } catch (error) {
        req.flash("error", "Oops !")
        return res.redirect("/admin/prof") 
    }
}