const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types;
const Schema = mongoose.Schema;

//creating schema of category
const wholesaler_schema = new mongoose.Schema({
     
  WholeSaler_Name: {
        type: String,
        
    }, 
    WholeSaler_Address:{
     type : String ,
     
    },
    WholeSaler_Phone:{
        type : String ,
        
       },
       Distributor_ID:{
        type: Schema.Types.ObjectId,
        ref: "distributor",
    },
    Product_ID:{
        type: Schema.Types.ObjectId,
        ref: "product",
    },

}


)

//creating collection
const wholesaler = new mongoose.model('wholesaler', wholesaler_schema)


//export collection
module.exports =  wholesaler ;