const express = require("express");
const updateProfile = require("./img-upload");
const titleModel = require("../models/titlesModel");

module.exports = async (req, res) => {
	try {
		const url = await updateProfile(req.file);

		let title = await titleModel.create({
			titleImg: url,
			titleName: req.body.formTitle,
			titleDesc: req.body.formDesc,
			titleYear: req.body.formYear,
		});

		req.flash("note", "Title added !");
		return res.redirect("/admin/prof");
	} catch (error) {
		req.flash("error", "Oops !");
		return res.redirect("/admin/prof");
	}
};
