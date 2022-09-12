
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types;

//creating schema of role
const role_schema = new mongoose.Schema({


    role_type: {
        type: String,
        required: true,
    
    }
 
})


const role = new mongoose.model('role', role_schema)


//export collection
module.exports = {role} ;
