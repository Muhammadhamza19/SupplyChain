const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types;
const Schema = mongoose.Schema;

//creating schema of category
const product_schema = new mongoose.Schema({
     
   Product_Name: {
        type: String,
        required: true
    }, 
    Product_Category:{
     type : String ,
     
    },
    Product_Price:{
      type :Number
    },
   Package_ID:{
        type: Schema.Types.ObjectId,
        ref: "package",
    },
   Distributor_ID:{
        type: Schema.Types.ObjectId,
        ref: "distributor",
    },
    Manufacturer_ID:{
      type: Schema.Types.ObjectId,
      ref: "manufacturer",
  },
  Supplier_ID :{
    type :Schema .Types.ObjectId,
    ref :"supplier"
}


  
    


}


)

//creating collection
const product = new mongoose.model('product', product_schema)


//export collection
module.exports =  product;