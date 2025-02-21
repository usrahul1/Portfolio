const express = require('express')
const projModel = require('../models/projectModel')

module.exports = async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.file)

        let proj = await projModel.create({
            image: req.file.filename,
            projectTitle: req.body.formTitle,
            projDesc: req.body.formDesc,
            githubLink: req.body.formLink
        })

        req.flash("note", "Project added !")
        return res.redirect("/admin/prof") 
    } catch (error) {
        req.flash("error", "Oops !")
        return res.redirect("/admin/prof") 
    }
}
