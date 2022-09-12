import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { NavLink } from 'react-router-dom';

import { useEffect } from "react";


export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const loadProvider = async () => {
      // with metamask we have an access to window.ethereum & to window.web3
      // metamask injexts a global API into website
      // this API allows websites to request users, accounts, read data to blockchain,
      // sign messages and transactions

      console.log(window.web3)
      console.log(window.ethereum)
    }

    loadProvider()
  }, [])



  return (
    <div>
      <IconButton
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon sx={{color:'white'}}/>
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={async () => {
              const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
              console.log(accounts)
            }}>Connect To Wallet</MenuItem>
        <NavLink to={'/sign-in'} style={{textDecoration:'none', color:'black'}}>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
        </NavLink>
      </Menu>
    </div>
  );
}
