import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Link, NavLink } from 'react-router-dom';
import { Box, Button } from '@mui/material';

function Home() {
    return (
        <Box sx={{ textAlign: "center" }}>
            <NavLink to={'/sign-in'} style={{textDecoration: 'none'}}>
                <Button variant="contained" sx={{ mx:1, mt:30, p:2, fontSize:"18px", }}>Manufacturer</Button>
            </NavLink>
            <NavLink to={'/sign-up'} style={{textDecoration: 'none'}}>
                <Button variant="contained" sx={{ mx:1, mt:30,p:2, fontSize:"18px"}}>Distributer</Button>
            </NavLink>
        </Box>

    );
}
export default Home
