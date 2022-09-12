const express = require("express");
const app = express();
const package = require('../models/package');
const helperfunction = require('../utils/helperfunction');
const stock = require('../models/stock')


//FOR ADD PACKAGE DETAILS
const package_details  = async (req, res)=>{
    try {
        const { Package_Category , Package_Price ,Manufacturer_ID, Stock_ID } = req.body;
     const add_package = await new package({
        Package_Category ,
        Package_Price ,
        Manufacturer_ID, 
        Stock_ID
     })
    const for_save_package = await add_package.save();
    console.log(for_save_package);
    return res.status(200).send({ response: 200, message: "Stock Details",status: true,Data: for_save_package, });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

// FOR GET PACKAGE DETAILS
 const get_package_details = async(req, res)=>{
    try {
        const get_info = await package.find({})
        console.log(get_info);
        return res.status(200).send({ response: 200, message: " All package Details",status: true,Data:get_info, });
        
    } catch (error) {
        console.log(error);
        res.send(error);
    }
 }



//for Relation
const get_all_details = async (req, res)=>{
   try {
   

        const adver = await package.aggregate([
          
           
            {$lookup: { from: "stocks",
                  localField: "Stock_ID",
                  foreignField: "_id",
                  as: "stocks"}, },
                  { $unwind: "$stocks",},
                  {$addFields:{Stock_category : "$stock.Stock_Category", price: "$stock.Stock_Price" }}
        ])
        
        console.log(adver);
        res.send(adver)
    } catch (error) {
    console.log(error);
    }
       
}




      
    



module.exports = {package_details , get_package_details , get_all_details};

