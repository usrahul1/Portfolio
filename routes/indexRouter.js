const express = require("express");
const certifModel = require("../models/certificationsModel");
const fwModel = require("../models/frameworksModel");
const langModel = require("../models/languagesModel");
const projModel = require("../models/projectModel");
const titleModel = require("../models/titlesModel");
const router = express.Router();

router.get("/", async (req, res) => {
	let titleArray = await titleModel.find({}).lean();
	let certifArray = await certifModel.find({}).lean();
	let projArray = await projModel.find({}).lean();
	let fwArray = await fwModel.find({}).lean();
	let langArray = await langModel.find({}).lean();
	res.render("index", {
		titleArray,
		certifArray,
		fwArray,
		langArray,
		projArray,
	});
});

router.get("/about", (req, res) => {
	res.render("aboutPage");
});

router.get("/projects", async (req, res) => {
	let projArray = await projModel.find({}).lean();
	res.render("projectPage", { projArray });
});

router.get("/contact", (req, res) => {
	res.render("contactPage");
});

module.exports = router;
