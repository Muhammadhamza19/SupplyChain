const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types;
const Schema = mongoose.Schema;

//creating schema of category
const feedback_schema = new mongoose.Schema({
     
 Feedback: {
        type: String,
        required: true
    }, 
   Customer_CNIC:{
      type :String
    },
    Customer_ID:{
        type: Schema.Types.ObjectId,
        ref: "customer",
    },
    Product_ID :{
        type: Schema.Types.ObjectId,
        ref: "product",
    },
   


}


)

//creating collection
const feedback = new mongoose.model('feedback', feedback_schema)


//export collection
module.exports = feedback;