const express = require("express");
const supplier_router = express.Router();
const { supplier_details , get_supplier_details  } = require('../controllers/supplier.controller');
const verifyAdmin = require("../middleware/admin.auth");
const verifyToken = require("../middleware/auth");

// FOR ADD SUPPLIER
supplier_router.post('/api/add_supplier' , [verifyToken,verifyAdmin] ,supplier_details);

// FOR GET ALL DETAILS OF SUPPLIER
supplier_router.get('/api/get_supplier_details' , [verifyToken , verifyAdmin]  , get_supplier_details);



module.exports = supplier_router;


