const express = require('express')
const frameworkModel = require('../models/frameworksModel')

module.exports = async (req, res) => {
    try {
        console.log(req.body)
        let fw = await frameworkModel.create({
            frameName: req.body.formFW
        })
       req.flash("note", "FrameWork added !")
       return res.redirect("/admin/prof") 
    } catch (error) {
        req.flash("error", "Oops !")
        return res.redirect("/admin/prof") 
    }
}