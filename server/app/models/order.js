const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types;
const Schema = mongoose.Schema;

//creating schema of category
const order_schema = new mongoose.Schema({
     
    Order_Date: {
        type: Date,
    }, 
    Product_Quantity:{
     type :Number ,
     
    },
    Customer_ID:{
        type: Schema.Types.ObjectId,
        ref: "customer",
    }, 
    WholeSaler_ID:{
        type: Schema.Types.ObjectId,
        ref: "wholesaler",
    }, 

    Product_ID :{
        type: Schema.Types.ObjectId,
        ref: "product",
    },
}


)

//creating collection
const order = new mongoose.model('order', order_schema)


//export collection
module.exports = order;