const express = require('express');
const { getorders, getuserDetails, updateservicestatus } = require('../controllers/admin');
const router = express.Router();
const {requireSignIn,isAdmin} = require("../Helper/middleware")

//fetch all orders under the particular station owners
router.get('/orders', requireSignIn,isAdmin,getorders)
//fetch all users who are registered
router.get('/userdetails',requireSignIn,isAdmin,getuserDetails)
//used to update the status of the bookings
router.post('/update-status',requireSignIn,isAdmin,updateservicestatus)

module.exports = router;
