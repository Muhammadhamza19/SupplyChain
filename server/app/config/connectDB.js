const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://SupplyChainFYP:fizza123456789@cluster0.oa9a6v4.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
}).then(() => {
    console.log("Connection Successful")
}).catch((e) => {
    console.log(e)
})

