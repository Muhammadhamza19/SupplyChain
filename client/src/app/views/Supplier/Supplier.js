import { Box, FormControl, TextField, Typography, Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

function Supplier(){
    const { register, handleSubmit, formState: { errors }, reset } = useForm({});
    return(
        <>
<Box height={"200px"}>
    <Typography variant="h3" textAlign={'center'}>
        Add Supplier
    </Typography>

</Box>
 <Box
 component="form"

>
 <FormControl
   sx={{
     width: '100%', py: 2
   }}>
   <TextField
     error={errors?.name?.message && (true)}
     placeholder="Please enter name"
     {...register('name', {
       required: "Please Enter name",

     })}
   />
   {errors.name && <span role="alert" style={{ color: 'red' }}>{errors.name.message}</span>}
 </FormControl>
 <FormControl sx={{ width: '100%', py: 2 }}>
   <TextField type="email"
     error={errors?.email?.message && (true)}
     placeholder="Please enter email"
     {...register('email', {
       required: "Please Enter email",

     })}
   />
   {errors.email && <span role="alert" style={{ color: 'red' }}>{errors.email.message}</span>}
 </FormControl>
 <FormControl sx={{ width: '100%', py: 2 }}>
   <TextField
     error={errors?.subject?.message && (true)}
     placeholder="Please enter subject"
     {...register('subject', {
       required: "Please Enter subject",

     })}
   />
   {errors.subject && <span role="alert" style={{ color: 'red' }}>{errors.subject.message}</span>}
 </FormControl>
 <FormControl sx={{ width: '100%', py: 2 }}>
   <TextField
     error={errors?.message?.message && (true)}
     multiline rows={5} placeholder="Please enter message"
     {...register('message', {
       required: "Please Enter message",

     })}
   />
   {errors?.message?.message && <span role="alert" style={{ color: 'red' }}>{errors.message.message}</span>}
 </FormControl>
 <Button type="submit" variant="contained" fullWidth sx={{ borderRadius: 2, p: 2, bgcolor: "#3B5998", }}>Send</Button>
</Box>
        </>


    )
}
export default Supplier