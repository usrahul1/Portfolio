const express = require("express");
const projModel = require("../models/projectModel");
const updateProfile = require("./img-upload");

module.exports = async (req, res) => {
	try {
		const url = await updateProfile(req.file);

		let proj = await projModel.create({
			image: url,
			projectTitle: req.body.formTitle,
			projDesc: req.body.formDesc,
			githubLink: req.body.formLink,
		});

		req.flash("note", "Project added !");
		return res.redirect("/admin/prof");
	} catch (error) {
		req.flash("error", "Oops !");
		console.log(error);
		return res.redirect("/admin/prof");
	}
};
