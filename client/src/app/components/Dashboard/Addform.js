import React, { Fragment, useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';

import { FormControl, TextField, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Service } from '../../config/service';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { LoadingButton } from '@mui/lab';
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider'
import { loadContract } from '../../../utils/load-contract';


const Addform = () => {
  // const [PackageID, setPackageID] = useState()
  // const [ProductID, setProductID] = useState()
  const [ProductName, setProductName] = useState()
  const [ProductCategory, setProductCategory] = useState()
  const [ProductPrice, setProductPrice] = useState()
const { register, handleSubmit, watch, setError, formState: { errors } } = useForm({});
  const password = useRef({});
  password.current = watch("password", "");
const navigate = useNavigate()
const [web3Api, setWeb3Api] = useState({
  provider: null,
  web3: null,
  contract: null
})
const loadProvider = async () => {
  const provider = await detectEthereumProvider();
  console.log(provider);
  const contract = await loadContract("SupplyChain", provider);
  console.log(contract);
  if (provider) {
    provider.request({method: "eth_requestAccounts"})
    setWeb3Api({
      web3: new Web3(provider),
      provider,
      contract
    })
    
  }
  
  else {
    // if the provider is not detected, detectEthereumProvider resolves to null
    console.log('Please install MetaMask!')
  }
}
useEffect(() => {
 loadProvider()
}, [])

  const { signIn } = useAuth()
  const [loading, setLoading] = useState(false);
  const sendForm = async (data) => {
    setLoading(true)
    console.log(  ProductName, ProductCategory, ProductPrice )
    try {
      let phone = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/
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

      axios.post('https://supplychain20.herokuapp.com/api/add_product', {
        Product_Name: ProductName,
        Product_Category : ProductCategory,
        Product_Price : ProductPrice,
        Package_ID: localStorage.getItem("packageID"),
        Distributor_ID : localStorage.getItem("distributorID"),
        Manufacturer_ID : '62f2af30d8759342efccf8ed',
        Supplier_ID : localStorage.getItem("supplierID"),
      },{
        headers: {
          'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmYyYWYzMGQ4NzU5MzQyZWZjY2Y4ZWQiLCJNYW51ZmFjdHVyZXJfRW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2NjI5OTEwMTIsImV4cCI6MTY2MzA3NzQxMn0.JitttLM8cen9KrrwyeOgqHGEg0E-sO1upYaoTFtYeLU'
        }
      })
      .then(async function (response) {
        let {data} = response
        console.log(data);
         
      const { contract, web3 } = web3Api;
      let contractResult = await contract.contract.methods
    .registerM(
      data.Data._id,
      data.Data.Product_Name,
      data.Data.Product_Category,
      data.Data.Product_Price,
    )
    .send({ from: '0xb2e1c764c22cee61aa7a9514c679e3e4ec4fbb71' });
        localStorage.setItem("productID", data.Data._id);
        navigate('/dashboard')
      })

      const { response, status, message, Data } = await Service.signIn(obj)
     
      if (status === true && response === 200) {
        
      
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
          Add Product
        </Typography>
        {/* <FormControl sx={{ marginY: 1, width: "100%" }}>

          <TextField label="Package ID" required value={PackageID} onChange={(e)=>{setPackageID(e.target.value)}} variant="outlined" type="text"
            // {...register('email', {
            //   required: "Please Enter ID",

            // })}
          />
          {errors.email && <span role="alert" style={{ color: 'red' }}>{errors.email.message}</span>}
        </FormControl>
        <FormControl sx={{ marginY: 1, width: "100%" }}>

          <TextField label="Product ID" required value={ProductID} onChange={(e)=>{setProductID(e.target.value)}} variant="outlined" type="text"
            // {...register('email', {
            //   required: "Please Enter ID",

            // })}
          />
          {errors.email && <span role="alert" style={{ color: 'red' }}>{errors.email.message}</span>}
        </FormControl> */}
        <FormControl sx={{marginY: 1}} fullWidth>
                    <TextField fullWidth required label="Product Name" value={ProductName} onChange={(e)=>{setProductName(e.target.value)}} variant="outlined" type="text" 
                   
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
                    <TextField fullWidth label="Product Category" required value={ProductCategory} onChange={(e)=>{setProductCategory(e.target.value)}} variant="outlined" type="text" InputProps={{ disableUnderline: true }}
                   
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
                    <TextField fullWidth label="Product Price" required value={ProductPrice} onChange={(e)=>{setProductPrice(e.target.value)}} variant="outlined" type="number" InputProps={{ disableUnderline: true }}
                   
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
