const cloudinary = require("../config/cloudinary");
const projectModel = require("../models/projectModel");
const titleModel = require("../models/titlesModel");

//project and title

const updateProfile = async function (profilePic) {
	try {
		if (!profilePic) {
			console.log("didnt get img");
			return null;
		}
		console.log(profilePic);

		// const uploadResponse = await cloudinary.uploader.upload(profilePic);
		// return uploadResponse.secure_url;

		const uploadPromise = new Promise((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{ resource_type: "auto" }, // auto-detect file type (image, video, etc.)
				(error, result) => {
					if (error) {
						console.log("Error in uploading:", error);
						reject("Error uploading image");
					}
					resolve(result.secure_url);
				}
			);

			// Pipe the file buffer into Cloudinary
			uploadStream.end(profilePic.buffer); // Using the file buffer here
		});

		// Wait for the upload to finish and return the URL
		const secureUrl = await uploadPromise;
		console.log(secureUrl);
		return secureUrl;
	} catch (error) {
		console.log("Error in uploading~:", error);
		req.flash("error", "error in upload");
	}
};

module.exports = updateProfile;
