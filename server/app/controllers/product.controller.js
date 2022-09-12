const express = require ("express");
const app = express();
const product = require('../models/product');
const helperfunction = require('../utils/helperfunction')


// INSERTING SUPPLIER DETAILS

const product_details = async (req, res)=>{
   try {
       const { Product_Name,Product_Category,Product_Price, Package_ID ,  Supplier_ID ,Distributor_ID , Manufacturer_ID} = req.body;
   const add_product = await new product({
    Product_Name,
    Product_Category,
    Product_Price, 
    Package_ID , 
    Supplier_ID,
    Distributor_ID , 
    Manufacturer_ID
   }); 
   const for_save = await add_product.save();
   console.log(for_save);
   return res.status(200).send({ response: 200, message: "Product Details",status: true,Data: for_save, });
} catch (error) {
       console.log(error);
       res.send(error);
}
}



// FOR GET SUPPLIER DETAILS

const get_product_details = async (req, res)=>{
try {

   const get_details_product = await product.find({})
   console.log(get_details_product);
   return res.status(200).send({ response: 200, message: " All Supplier Details",status: true,Data: get_details_product, });
} catch (error) {
   console.log(error);
   res.send(error);
}
}


const for_table = async (req, res)=>{
    try {
    
  
         const list_details = await product.aggregate([
           
              
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

                   {$lookup: { from: "distributors",
                   localField: "Distributor_ID",
                   foreignField: "_id",
                   as: "distributors"}, },



                  { $unwind: "$packages",},
                 { $unwind: "$suppliers",},
                  { $unwind: "$manufacturers",},
                 // { $unwind: "$products",},
                  { $unwind: "$distributors",},

         ])
         
         console.log(list_details);
         res.send(list_details)
     } catch (error) {
     console.log(error);
     }
        
  }
  



module.exports = {product_details  , get_product_details , for_table};
