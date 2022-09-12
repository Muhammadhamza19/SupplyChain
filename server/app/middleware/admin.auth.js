const jwt = require("jsonwebtoken");
const manufacturer  = require("../models/manufacturer");
var { ObjectId } = require('mongodb');
///var role = require('../models/manufacturer')
const verifyAdmin = async(req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return helperFunction(res, 403, "A Token Is Required For Authentication", false)
    }
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            req.manufacturer = decoded;
console.log(decoded);
            var manufacturerID = ObjectId(req.manufacturer._id)
            console.log(manufacturerID);
            const data = await manufacturer.aggregate([
                { $match: { _id: manufacturerID } },
                {
                    $lookup: {
                        from: "roles",
                        localField: "role",
                        foreignField: "_id",
                        as: "roles"
                    }
                   
                }, 
                {$unwind : '$roles'},
            ])
            console.log(data);
            if (data[0].role_type==="admin") {
                return next();
            } else {
                console.log("Sorry Access Denied")
                let helperfunction = () => {
                    let response = 403;
                    let messages = "Sorry Access Denied";
                    let status = false;
                    return res.status(403).send({ response: response, message: messages, status: status, })
                }
      
                helperfunction()
               
            }
        } catch (err) {
          //  console.trace('Inside Catch => ', err);
            //  return helperFunction.serverError(res, "Some Error Is Occurred")
            console.log(err)
        }

    }

}

module.exports = verifyAdmin;