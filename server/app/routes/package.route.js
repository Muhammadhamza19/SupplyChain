const express = require("express");
const package_router = express.Router();
const {package_details , get_package_details , get_all_details} = require('../controllers/package.controller');
const verifyAdmin = require("../middleware/admin.auth");
const verifyToken = require("../middleware/auth");
// FOR ADD STOCK
package_router.post('/api/add_package', [verifyToken , verifyAdmin] , package_details);

// FOR GET ALL DETAILS OF STOCK
package_router.get('/api/get_package_details' , [verifyToken , verifyAdmin]  , get_package_details);


package_router.get('/api/for_all_details' , get_all_details);



module.exports = package_router;


