const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types;
const Schema = mongoose.Schema;

//creating schema of category
const stock_schema = new mongoose.Schema({
     
    Stock_Category: {
        type: String,
    }, 
    Stock_Price :{
     type :Number ,
     
    },
    Supplier_ID:{
        type: Schema.Types.ObjectId,
        ref: "supplier",
    }, 
}


)

//creating collection
const stock = new mongoose.model('stock', stock_schema)


//export collection
module.exports =  stock;