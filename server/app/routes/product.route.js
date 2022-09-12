const express = require("express");

const product_router = express.Router();
const {product_details  , get_product_details , for_table} = require('../controllers/product.controller');
const verifyAdmin = require("../middleware/admin.auth");
const verifyToken = require("../middleware/auth");
// FOR ADD STOCK
product_router.post('/api/add_product', [verifyToken , verifyAdmin] , product_details);

// FOR GET ALL DETAILS OF STOCK
product_router.get('/api/get_product_details' , [verifyToken , verifyAdmin]  , get_product_details);

product_router.get('/api/fortable' , for_table);






module.exports = product_router;


