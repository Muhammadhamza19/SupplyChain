const express = require('express');
const app = express();
const bodyparser = require('body-parser'); //body-parser is an npm library used to process data sent through an HTTP request body
PORT = process.env.PORT || 8800 //port define
require('./config/connectDB');
require('dotenv').config()
const cors = require('cors');
app.use(cors({
    origin:'http://localhost:3000'}));
    app.use(bodyparser.urlencoded({
        limit: '500mb',
       parameterLimit: 100000,
        extended: true
  }));
app.use(express.json()) 
app.use(express.urlencoded({extended:true}));

const supplier_router = require('./routes/supplier.route');
const stock_router = require('./routes/stock.route');
const package_router = require('./routes/package.route')
const distributor_router = require('./routes/distributor.route')
const manufacturer_router = require('./routes/manufacturer.route')
const role_router = require('./routes/role.route')
const product_router= require('./routes/product.route')

product_router
app.use([supplier_router , stock_router , package_router , distributor_router , manufacturer_router , role_router, product_router]);



app.listen(PORT, () => {
    console.log(`server is start ${PORT}`)
})
