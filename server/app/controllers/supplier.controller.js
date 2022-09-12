 const express = require ("express");
 const app = express();
 const supplier = require('../models/supplier');
 const helperfunction = require('../utils/helperfunction')


 // INSERTING SUPPLIER DETAILS

 const supplier_details = async (req, res)=>{
    try {
        const {Supplier_Name , Supplier_Address, Supplier_Phone} = req.body;
    const add_supplier = await new supplier({
        Supplier_Name,
        Supplier_Address,
        Supplier_Phone
    }); 
    const for_save = await add_supplier.save();
    console.log(for_save);
    return res.status(200).send({ response: 200, message: "Supplier Details",status: true,Data: for_save, });
} catch (error) {
        console.log(error);
        res.send(error);
}
 }



 // FOR GET SUPPLIER DETAILS

const get_supplier_details = async (req, res)=>{
try {

    const get_details = await supplier.find({})
    console.log(get_details);
    return res.status(200).send({ response: 200, message: " All Supplier Details",status: true,Data: get_details, });
} catch (error) {
    console.log(error);
    res.send(error);
}
}



 module.exports = {supplier_details , get_supplier_details};
