const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types;
const Schema = mongoose.Schema;

//creating schema of category
const customer_schema = new mongoose.Schema({
     
  Customer_Name: {
        type: String,
        required: true
    }, 
   Customer_Phone:{
     type : String ,
     
    },
   Customer_CNIC:{
      type :String
    },
   Package_ID:{
        type: Schema.Types.ObjectId,
        ref: "package",
    },
    Order_ID:{
        type: Schema.Types.ObjectId,
        ref: "order",
    },
    FeedBack_ID:{
        type: Schema.Types.ObjectId,
        ref: "feedback",
    }
    


}


)

//creating collection
const customer = new mongoose.model('customer', customer_schema)


//export collection
module.exports = customer;