const {Service , getuserorders} = require("../controllers/user")
const express = require('express');
const { requireSignIn } = require("../Helper/middleware");
const router = express.Router();

//book the service
router.post('/service',requireSignIn,Service);
//fetch the orders of the particular user
router.get('/userorder',requireSignIn,getuserorders)


module.exports = router;
