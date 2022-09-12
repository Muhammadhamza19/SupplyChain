const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types;
const Schema = mongoose.Schema;

//creating schema of category
const supplier_schema = new mongoose.Schema({
     
    Supplier_Name: {
        type: String,
        required: true
    }, 
    Supplier_Address:{
     type : String ,
     
    },
    Supplier_Phone:{
      type : String
    }, 
}


)

//creating collection
const supplier = new mongoose.model('supplier', supplier_schema)


//export collection
module.exports =  supplier ;