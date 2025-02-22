const express = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const {createToken} = require('../utils/createToken')
const adminModel = require('../models/adminModel')
const certifModel = require('../models/certificationsModel')
const fwModel = require('../models/frameworksModel')
const languagesModel = require('../models/languagesModel')
const projectModel = require('../models/projectModel')
const titlesModel = require('../models/titlesModel')

module.exports.loginUser = async(req, res) => {
    let password = req.body.adminPassword
    let user = await adminModel.findOne({name: process.env.NAME})
    let hash = user.password
    bcrypt.compare(password, hash, (err, result) => {
        if(!result){
            req.flash("error", "Incorrect password!")
            return res.redirect("/admin/login")
        } 
        else{ 
            let token = createToken(user)
            res.cookie("token", token, { maxAge: 60*60*1000 })
            return res.redirect("/admin/prof")
        }
    })
}

module.exports.registerUser = async(req, res) => {
    let name = process.env.NAME
    let password = req.body.password
    if(await adminModel.countDocuments() > 0){
        let note = req.flash("error","Only 1 user allowed!")
        return res.redirect("/admin/login")
    } else {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                let adminCreated = await adminModel.create({
                    name,
                    password: hash
                })
                let note = req.flash("note", "User Created!")
                return res.redirect("/admin/login")
            })
        })
    }
}

module.exports.logoutUser = async(req, res) => {
    let token = ""
    res.cookie("token", token)
    res.redirect("/")
}

module.exports.deleteItem = async(req, res) => {
    try {
        let type = req.query.type
        let id = req.query.id
        if(type == 'certif') {
            await certifModel.findByIdAndDelete(id)
        } else if (type == 'fw') {
            await fwModel.findByIdAndDelete(id)    
        } else if(type == 'langs'){
            await languagesModel.findByIdAndDelete(id)
        } else if (type == 'project'){
            await projectModel.findByIdAndDelete(id)
        } else if(type == 'title') {
            await titlesModel.findByIdAndDelete(id)
        }
        req.flash("note", "Deleted :)")
        return res.redirect("/admin/prof")
    } catch (error) {
        req.flash("error", "Oopsie something went wrong! :(")
        return res.redirect('/admin/prof')
    }
}

module.exports.fetchDetails = async (req, res) => {
    let type = req.query.type
    let id = req.query.id
    let data
    if(type == 'certif') {
        data = await certifModel.findById(id)
    } else if (type == 'fw') {
        data = await fwModel.findById(id)    
    } else if(type == 'langs'){
        data = await languagesModel.findById(id)
    } else if (type == 'project'){
        data = await projectModel.findById(id)
    } else if(type == 'title') {
        data = await titlesModel.findById(id)
    }
    if(!data) {
        req.flash("error", "try again :(")
        return res.redirect("/admin/prof")
    }
    return res.render("editFile", { type, data })
}

module.exports.editItem = async (req, res) => {
    let type = req.query.type
    let id = req.query.id
    if(type == 'certif') {
        await certifModel.findOneAndUpdate({_id: id}, {
            certifName: req.body.formTitle,
            yearOfCompletion: req.body.formYear
        })
    } else if (type == 'fw') {
        await fwModel.findByIdAndUpdate({_id: id}, {
            frameName: req.body.frameTitle
        })    
    } else if(type == 'langs'){
        await languagesModel.findByIdAndUpdate({_id: id}, {
            langName: req.body.langName
        })
    } else if (type == 'project'){
        const updateData = {
            projectTitle: req.body.formTitle,
            projDesc: req.body.formDesc,
            githubLink: req.body.formLink
        };
        if (req.file) {
            updateData.image = req.file.filename;
        }
        await projectModel.findByIdAndUpdate(id, updateData);
    } else if(type == 'title') {
        const updateData = {
            titleName: req.body.formTitle,
            titleDesc: req.body.formDesc,
            titleYear: req.body.formYear
        };
        if (req.file) {
            updateData.titleImg = req.file.filename;
        }
        await titlesModel.findByIdAndUpdate(id, updateData);
    }
    req.flash("note", "Updated bro :)")
    return res.redirect("/admin/prof")
}