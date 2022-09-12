import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoadingButton } from '@mui/lab';
import { Link } from "react-router-dom";
import Login from "../SignIn/Login";
import { toast, ToastContainer } from 'react-toastify';
import { Service } from "../../config/service";
import { useRef, useState } from "react";
// import { Link } from 'react-router-dom';

const SignUp = () => {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const [loading, setLoading] = useState(false);

  const submitForm = async (data) => {
    console.log("hello");
    console.log(data)
    setLoading(true)
    try {
     
      let obj = {
        name: data.name,
        phoneno: data.contact,
        email: data.email,
        password:data.password
      }
      const { response, status } = await Service.signUp(obj);
        console.log("Api Res line  30",response)

      if (response === 200 && status === true) {
        // reset()
        alert("User signup successfully !!")

        // redirect to
        
      }
    } catch (error) {
      toast.error(error.message, {
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
        onSubmit={handleSubmit(submitForm)}
        sx={{

          borderRadius: 3,
          bgcolor: " #FFFFF0",
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
          SignUp
        </Typography>
        <FormControl sx={{ mt: 3, mb: 1, width: "100%" }}>

          <TextField label=" Username" variant="outlined"
            {...register('name', {
              required: "Please Enter name",

            })}
          />
          {errors.name && <span role="alert" style={{ color: 'red' }}>{errors.name.message}</span>}
        </FormControl>
        <FormControl sx={{ my: 1, width: "100%" }}>

          <TextField label=" email" variant="outlined" type="email"
            {...register('email', {
              required: "Please Enter email",

            })}
          />
          {errors.email && <span role="alert" style={{ color: 'red' }}>{errors.email.message}</span>}
        </FormControl>
        <FormControl sx={{ my: 1, width: "100%" }}>

          <TextField label="Contact" variant="outlined" type="number"
            {...register('contact', {
              required: "Please Enter contact",

            })}
          />
          {errors.contact && <span role="alert" style={{ color: 'red' }}>{errors.contact.message}</span>}
        </FormControl>
        <FormControl fullWidth>
          <TextField fullWidth name="password" placeholder="Password" variant="outlined" InputProps={{ disableUnderline: true }}
            type="password"
            sx={{ mb: 1 }}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password Minimum Length is 6"
              }
            })}

          />

        </FormControl>
        <FormControl fullWidth>
          <TextField name="confirmPassword" placeholder="Confirm Password" variant="outlined" InputProps={{ disableUnderline: true }}
            type="password"
            {...register('confirmPassword', {
              required: "Confirm Password Is Required",
              validate: value =>
                value === password.current || "The Passwords Do not Match"
            })}
           
            fullWidth
          />

        </FormControl>
        <LoadingButton loading={loading} type='submit' variant="contained"
        
          sx={{
            backgroundImage: "linear-gradient(to right top, #445f89, #4f859d, #7aa8a9, #b1c9bc, #e5e9de)",
            borderRadius: 1.5,
            p: 1.5, width: "100%",
            marginTop: 4,
            // bgcolor: "#3B5998"
          }}>
          Register
        </LoadingButton>

      </Box>
    </Box>
  );
}

export default SignUp
