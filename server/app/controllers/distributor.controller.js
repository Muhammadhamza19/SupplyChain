const express = require("express");
const app = express();
const distributor = require('../models/distributor');
const helperfunction = require('../utils/helperfunction');
const stock = require('../models/stock')


//FOR ADD PACKAGE DETAILS
const distributor_details  = async (req, res)=>{
    try {
        const {  Distributor_Name ,Distributor_Address ,Distributor_Phone, Manufacturer_ID,Package_ID, Supplier_ID } = req.body;
     const add_package = await new distributor({
        Distributor_Name ,
        Distributor_Address ,
        Distributor_Phone, 
        Manufacturer_ID,
        Package_ID,
        Supplier_ID
     })
    const for_save_package = await add_package.save();
    console.log(for_save_package);
    return res.status(200).send({ response: 200, message: "distributor Details",status: true,Data: for_save_package, });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

// FOR GET PACKAGE DETAILS
 const get_distributor_details = async(req, res)=>{
    try {
        const get_info = await distributor.find({})
        console.log(get_info);
        return res.status(200).send({ response: 200, message: " All distributor Details",status: true,Data:get_info, });
        
    } catch (error) {
        console.log(error);
        res.send(error);
    }



 }


 const details_all = async (req, res)=>{
    try {
    
  
         const list_details = await distributor.aggregate([
           
              
            {$lookup: { from: "packages",
            localField: "Package_ID",
            foreignField: "_id",
            as: "packages"}, },
                    
                   {$lookup: { from: "suppliers",
                   localField: "Supplier_ID",
                   foreignField: "_id",
                   as: "suppliers"}, },

                   {$lookup: { from: "manufacturers",
                   localField: "Manufacturer_ID",
                   foreignField: "_id",
                   as: "manufacturers"}, },




                  { $unwind: "$packages",},
                  { $unwind: "$suppliers",},
                  { $unwind: "$manufacturers",},
                 

         ])
         
         console.log(list_details);
         res.send(list_details)
     } catch (error) {
     console.log(error);
     }
        
  }
  


    


module.exports = {distributor_details , get_distributor_details  , details_all};

