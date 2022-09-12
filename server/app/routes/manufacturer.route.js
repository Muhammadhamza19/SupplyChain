const express = require("express");
const manufacturer_router = express.Router();
const {Signup , signIn , details_manufacturer } = require('../controllers/manufacturer.controller');
const verifyAdmin = require("../middleware/admin.auth");
const verifyToken = require("../middleware/auth");
// FOR ADD DISTRIBUTOR
manufacturer_router.post('/api/for_signup' , [verifyToken , verifyAdmin],Signup);

// FOR GET ALL DETAILS OF DISTRIBUTOR
manufacturer_router.post('/api/for_signin' ,signIn);

//FOR GET ALL DETALS
manufacturer_router.get('/api/for_get_list' , [verifyToken , verifyAdmin] , details_manufacturer)



module.exports = manufacturer_router;


