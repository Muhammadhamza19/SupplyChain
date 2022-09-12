const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types;
const Schema = mongoose.Schema;

//creating schema of category
const manufacturer_schema = new mongoose.Schema({
     
    Manufacturer_Name: {
        type: String,
        required: true
    }, 
    Manufacturer_Phone:{
     type : String ,
     
    },
    Manufacturer_Email:{
        type : String ,
        
       },
    Password :{
        type : String,
        required: true,
    },
    Supplier_ID:{
        type: Schema.Types.ObjectId,
        ref: "supplier",
    },

    Stock_ID:{
        type: Schema.Types.ObjectId,
        ref: "stock",
    },
    Package_ID:{
        type: Schema.Types.ObjectId,
        ref: "package",
    },
   Distributor_ID:{
        type: Schema.Types.ObjectId,
        ref: "distributor",
    },
    Product_ID:{
        type: Schema.Types.ObjectId,
        ref: "product",
    },
    Wholesaler_ID:{
        type: Schema.Types.ObjectId,
        ref: "wholesaler",
    },
    Order_ID:{
        type: Schema.Types.ObjectId,
        ref: "order",
    },
    Customer_ID:{
        type: Schema.Types.ObjectId,
        ref: "customer",
    },
   Feedback_ID:{
        type: Schema.Types.ObjectId,
        ref: "feedback",
    },
    role :{
        type:String
    }, 
    role_type : {
type:String
    }
   

}


)

//creating collection
const manufacturer = new mongoose.model('manufacturer', manufacturer_schema)


//export collection
module.exports =  manufacturer ;