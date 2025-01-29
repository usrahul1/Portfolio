const express = require('express')
const router = express.Router()

// router.get('/', (req, res) => {
//     res.render("adminLogin")
// })

// router.get('/', (req, res) => {
//     res.render("adminIndex")
// })

router.get("/", (req, res) => {
    const { type } = req.query || null;
    // console.log("Type received:", type);
    
    // Send a response back to be used in the modal (if needed)
    res.render("adminIndex", {
        dataType: type  // Pass the data-type to EJS if necessary
    });
});


// router.get('/form', (req, res) => {
//     res.render("modalForm")
// })

module.exports = router