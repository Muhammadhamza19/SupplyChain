const express = require('express');
const  manufacturer  = require("../models/manufacturer");
const app = express();
require("dotenv").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const  role  = require('../models/role')
const helperFunction = require('../utils/helperfunction');
const { ObjectId } = require('mongodb');


//FOR SIGN IN MANUFACTURER
const Signup = async (req, res) => {
 
  try {
      const {Manufacturer_Name,Manufacturer_Phone,Manufacturer_Email,Password}=req.body
      const addmanufacturer = await new manufacturer({
        Manufacturer_Name,
        Manufacturer_Phone,
        Manufacturer_Email,
        Password,
         
        
      }); 
    console.log(addmanufacturer);
      
    var encryptedPassword = await bcrypt.hash(addmanufacturer.Password, 10);
    addmanufacturer.Password = encryptedPassword;
    addmanufacturer.role = "62f2ac3d26227ebac19a3a1d"
    addmanufacturer.role_type ="user"
    let insertmanufacturer = await addmanufacturer.save();
    console.log(insertmanufacturer);
      
    const token = jwt.sign(
        { Manufacturer_Email: addmanufacturer.Manufacturer_Email, Manufacturer_Phone: addmanufacturer.Manufacturer_Phone, _id: addmanufacturer._id },
         //  "hardcodedTOKEN_KEY",
         "process.env.TOKEN_KEY",
          {
              expiresIn: "108h",
          }
      );

      var tokens = token;

      return res.status(200).send({ response: 200 , message: "Sign-up Successfully", status: true , Data :[insertmanufacturer , tokens, addmanufacturer.role]})      
  } catch (e) {
      console.log(e)
      res.status(400).send(e)
  }
}





//Sign In
const signIn = async (req, res) => {
  try {
      const { Manufacturer_Phone,Manufacturer_Email,Password } = req.body;

      if (!(Manufacturer_Email || Manufacturer_Phone && Password)) {
          return res.status(400).send("All input is required");
      }

      const user = await manufacturer.findOne({ $or: [{Manufacturer_Email:Manufacturer_Email }, { Manufacturer_Phone: Manufacturer_Phone }] });

      console.log(user);
      if (user && (await bcrypt.compare(Password, user.Password))) {
          console.log("sign in");

          console.log(user.role)
          if (user.role===("62f2ac3426227ebac19a3a1b"))  {
            const token = jwt.sign(
              { _id: user._id, Manufacturer_Email:user.Manufacturer_Email, Manufacturer_Phone: user.phoneno },
              process.env.TOKEN_KEY, {
                expiresIn: "1d",
            }
              
          );
          var tokens = token;
          return res.status(200).send({ response: 200 , message: "Login Successfully", status: true , Data : user.Manufacturer_Name , token})
          // user
        }
        else{
         return res.status(200).send({ response: 406 , message: "Can't Login, Only Admin access", status: false })

         // return Function(406,"Can't Login, Only Admin access",false,null,res)
        }

          
         

      }
      else{
        return res.status(400).send("Invalid Credentials");
      }
  } catch (err) {
      console.log(err);
  }
}


//for Relation
const details_manufacturer = async (req, res)=>{
  try {
  

       const list_details = await manufacturer.aggregate([
         
          
           {$lookup: { from: "packages",
                 localField: "Package_ID",
                 foreignField: "_id",
                 as: "packages"}, },
                 { $unwind: "$packages",},
                 
       ])
       
       console.log(list_details);
       res.send(list_details)
   } catch (error) {
   console.log(error);
   }
      
}



  

module.exports={ Signup , signIn , details_manufacturer } ;
