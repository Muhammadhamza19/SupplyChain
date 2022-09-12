const express = require("express");
const app = express();
const stock = require('../models/stock');
const helperfunction = require('../utils/helperfunction');
const supplier = require('../models/supplier')

const stock_details  = async (req, res)=>{
    try {
        const { Stock_Category ,Stock_Price , Supplier_ID } = req.body;
     const add_stock = await new stock({
        Stock_Category ,
        Stock_Price ,
         Supplier_ID
     })
    const for_save_stock = await add_stock.save();
    console.log(for_save_stock);
    return res.status(200).send({ response: 200, message: "Stock Details",status: true,Data: for_save_stock, });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}
 const get_stock_details = async(req, res)=>{
    try {
        const get_details = await stock.find({})
        console.log(get_details);
        return res.status(200).send({ response: 200, message: " All Stock Details",status: true,Data:get_details, });
        
    } catch (error) {
        console.log(error);
        res.send(error);
    }
 }





module.exports = {stock_details , get_stock_details};

