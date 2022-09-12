const express = require("express");
const role_router = express.Router();
const {role_details , get_role_details} = require('../controllers/role.controller');

// FOR ADD ROLE
role_router.post('/api/for_add_role' , role_details);

// FOR GET ALL DETAILS OF ROLE
role_router.get('/api/for_get_role' ,get_role_details);



module.exports =  role_router;


