const express = require("express");
const stock_router = express.Router();
const {stock_details , get_stock_details  } = require('../controllers/stock.controller');
const verifyAdmin = require("../middleware/admin.auth");
const verifyToken = require("../middleware/auth");
// FOR ADD STOCK
stock_router.post('/api/add_stock' , [verifyToken , verifyAdmin],stock_details);

// FOR GET ALL DETAILS OF STOCK
stock_router.get('/api/get_stock_details', [verifyToken , verifyAdmin]  , get_stock_details);



module.exports = stock_router;


