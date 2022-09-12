const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types;
const Schema = mongoose.Schema;

//creating schema of category
const package_schema = new mongoose.Schema({
     
   Package_Category: {
        type: String,
        
    }, 
    Package_Price :{
     type : Number ,
     
    },
    Manufacturer_ID:{
        type: Schema.Types.ObjectId,
        ref: "manufacturer",
    },
   Stock_ID:{
        type: Schema.Types.ObjectId,
        ref: "stock",
    },


}


)

//creating collection
const package = new mongoose.model('package', package_schema)


//export collection
module.exports =  package ;