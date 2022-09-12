const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types;
const Schema = mongoose.Schema;

//creating schema of category
const distributor_schema = new mongoose.Schema({
     
  Distributor_Name: {
        type: String,
        
    }, 
    Distributor_Address:{
     type : String ,
     
    },
    Distributor_Phone:{
        type : String ,
        
       },
    Manufacturer_ID:{
        type: Schema.Types.ObjectId,
        ref: "manufacturer",
    },
    Package_ID:{
        type: Schema.Types.ObjectId,
        ref: "package",
    },
    Supplier_ID :{
        type :Schema .Types.ObjectId,
        ref :"supplier"
    }

}


)

//creating collection
const distributor = new mongoose.model('distributor', distributor_schema)


//export collection
module.exports =  distributor ;