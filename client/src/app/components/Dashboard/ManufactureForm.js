import React, { Fragment, useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { FormControl, TextField, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Service } from '../../config/service';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';



const Addform = () => {
const { register, handleSubmit,resetField, watch, setError, formState: { errors } } = useForm({});
  const password = useRef({});
  password.current = watch("password", "");
const [StockCategory, setStockCategory] = useState()
const [StockPrice, setStockPrice] = useState()
const [PackageCategory, setPackageCategory] = useState()
const [PackagePrice, setPackagePrice] = useState()
 const navigate = useNavigate()

let supplierID = localStorage.getItem("supplierID");


  const { signIn } = useAuth()
  const [loading, setLoading] = useState(false);

  const sendForm = async (data) => {
    setLoading(true)
    console.log(StockCategory, StockPrice, PackageCategory, PackagePrice)
    resetField("eamil")
    try {
      let phone = ''
      let email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      let obj = {
        password: data.password,
        email: '',
        phoneno: ''
      }
      if (data.emailorphone) {
        if (email.test(data.emailorphone)) {
          obj.email = data.emailorphone
        }
        else if (phone.test(data.emailorphone)) {
          obj.phoneno = data.emailorphone
        }
        else {
          setError("emailorphone", {
            type: 'custom',
            message: 'Entered value does not match email or phone no format',
          });
        }
      }

      axios.post('https://supplychain20.herokuapp.com/api/add_stock', {
        Stock_Category: StockCategory,
        Stock_Price : StockPrice,
        Supplier_ID: supplierID
      },{
        headers: {
          'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmYyYWYzMGQ4NzU5MzQyZWZjY2Y4ZWQiLCJNYW51ZmFjdHVyZXJfRW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2NjI5OTEwMTIsImV4cCI6MTY2MzA3NzQxMn0.JitttLM8cen9KrrwyeOgqHGEg0E-sO1upYaoTFtYeLU'
        }
      })
      .then(function (response) {
        let {data} = response
        console.log(data);
        localStorage.setItem("stockID", data.Data._id);


            axios.post('https://supplychain20.herokuapp.com/api/add_package', {
              Package_Category : PackageCategory,
              Package_Price : PackagePrice,
              Stock_ID : localStorage.getItem("stockID")
          },{
            headers: {
              'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmYyYWYzMGQ4NzU5MzQyZWZjY2Y4ZWQiLCJNYW51ZmFjdHVyZXJfRW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2NjI5OTEwMTIsImV4cCI6MTY2MzA3NzQxMn0.JitttLM8cen9KrrwyeOgqHGEg0E-sO1upYaoTFtYeLU'
            }
          })
          .then(function (response) {
            let {data} = response
            console.log(data);
        localStorage.setItem("packageID", data.Data._id);


            navigate('/dashboard/adddistributor')
          })

      })

      const { response, status,reset, message, Data } = await Service.signIn(obj)

      if (status === true && response === 200) {
        Data.name = ''
        console.log(email)
        signIn(Data.name, Data.tokens, Data.image);
        toast.success(message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } finally {
      setLoading(false)
    }
  };

  return (
    
    <Box
      sx={{
        backgroundImage: "linear-gradient(to right top, #445f89, #4f859d, #7aa8a9, #b1c9bc, #e5e9de)",
        position: "relative",
        height: "100vh"
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(sendForm)}
        sx={{
          borderRadius: 3,
          bgcolor: " white",
          boxShadow: 9,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 350,
          padding: 6
        }}>
        <Typography variant="h4"
          sx={{
            fontWeight: 600,
            textAlign: "center",
            fontFamily: "Barlow"
          }}>
          Package Details
        </Typography>
        <FormControl sx={{ marginY: 1, width: "100%" }}>

          <TextField label="Stock Category" required value={StockCategory} onChange={(e)=>{setStockCategory(e.target.value)}} variant="outlined" type="text"
            // {...register('email', {
            //   required: "Please Enter ID",

            // })}
          />
          {errors.email && <span role="alert" style={{ color: 'red' }}>{errors.email.message}</span>}
        </FormControl>
        <FormControl sx={{marginY: 1}} fullWidth>
                    <TextField fullWidth label="Stock Price" required value={StockPrice} onChange={(e)=>{setStockPrice(e.target.value)}} variant="outlined" type="text" 
                   
                    //   {...register("password", {
                    //     required: "required",
                    //     minLength: {
                    //       value: 5,
                    //       message: "min length is 6"
                    //     }
                    //   })}

                    />                  
          {errors.password && <span role="alert" style={{ color: 'red' }}>{errors.password.message}</span>}
        </FormControl>
        <FormControl sx={{marginY: 1}} fullWidth>
                    <TextField fullWidth label="Package Category" required value={PackageCategory} onChange={(e)=>{setPackageCategory(e.target.value)}} variant="outlined" type="text" InputProps={{ disableUnderline: true }}
                   
                    //   {...register("password", {
                    //     required: "required",
                    //     minLength: {
                    //       value: 5,
                    //     //   message: "min length is 6"
                    //     }
                    //   })}

                    />                  
          {errors.password && <span role="alert" style={{ color: 'red' }}>{errors.password.message}</span>}
        </FormControl>
        <FormControl fullWidth>
                    <TextField fullWidth label="Package Price" required value={PackagePrice} onChange={(e)=>{setPackagePrice(e.target.value)}} variant="outlined" type="number" InputProps={{ disableUnderline: true }}
                   
                    //   {...register("password", {
                    //     required: "required",
                    //     minLength: {
                    //       value: 5,
                    //       message: "min length is 6"
                    //     }
                    //   })}

                    />                  
          {errors.password && <span role="alert" style={{ color: 'red' }}>{errors.password.message}</span>}
        </FormControl>
        <LoadingButton loading={loading}  type='submit' variant="contained"
        // component={Link} to="./"
          sx={{
            backgroundImage: "linear-gradient(to right top, #445f89, #4f859d, #7aa8a9, #b1c9bc, #e5e9de)",
            borderRadius: 1.5,
            p: 1.5, width: "100%",
            marginTop: 4,
            // bgcolor: "#3B5998"
          }}>
          Submit
        </LoadingButton>

      </Box>
    </Box>
  );
}

export default Addform;
