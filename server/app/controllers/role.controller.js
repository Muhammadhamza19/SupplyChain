const express = require("express");
const app = express();
const {role} = require('../models/role');
const helperfunction = require('../utils/helperfunction');


const role_details  = async (req, res)=>{
    try {
        const {role_type} = req.body;
        const add_role = await new role({
           role_type
        }); 
        
   
    const for_save_role = await add_role.save();
    console.log(for_save_role);
    return res.status(200).send({ response: 200, message: "Role Details",status: true,Data: for_save_role, });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}
 const get_role_details = async(req, res)=>{
    try {
        const role_details = await role.find({})
        console.log(role_details);
        return res.status(200).send({ response: 200, message: " All Stock Details",status: true,Data:role_details});
        
    } catch (error) {
        console.log(error);
        res.send(error);
    }
 }





module.exports = {role_details , get_role_details};

