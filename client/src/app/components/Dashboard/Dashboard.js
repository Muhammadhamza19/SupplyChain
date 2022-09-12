import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link,NavLink } from 'react-router-dom';
import axios from 'axios';
import AddProduct from './Addform';
import Login from '../SignIn/Login';
import { Service } from '../../config/service';
import MenuButton from './MenuButton';
import { useEffect } from 'react';
import { loadContract } from '../../../utils/load-contract';
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider'

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Dashboard() {
  const [web3Api, setWeb3Api] = React.useState({
    provider: null,
    web3: null,
    contract: null
  })
  const [manufactureData, setManufactureData] = React.useState([]);
    console.log(manufactureData)
  React.useEffect(()=>{
    getData()
  },[])

  const getData = async () =>{
try {
  const result= await Service.completeData()
      
        setManufactureData(result)
      

} catch (error) {
  console.log(error)
}
  }
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <NavLink to={'/dashboard'} style={{textDecoration:'none', color:'white'}}>
          <Typography variant="h6" noWrap >
            Manufacturer Home 
          </Typography>
          </NavLink>
        </Toolbar>
          <Toolbar>
            <MenuButton/>
          </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <NavLink to={'/dashboard/addsupplier'} style={{textDecoration:'none'}}>
            <ListItem  disablePadding >
              <ListItemButton >
                <ListItemIcon >
                 <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Add Supplier' />
              </ListItemButton>
            </ListItem>
            </NavLink>
            <NavLink to={'/dashboard/addmanufacture'} style={{textDecoration:'none'}}>
            <ListItem  disablePadding >
              <ListItemButton >
                <ListItemIcon >
                 <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Package Details' />
              </ListItemButton>
            </ListItem>
            </NavLink>
            <NavLink to={'/dashboard/adddistributor'} style={{textDecoration:'none'}}>
            <ListItem  disablePadding >
              <ListItemButton >
                <ListItemIcon >
                 <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Add Distributor' />
              </ListItemButton>
            </ListItem>
            </NavLink>
            <NavLink to={'/dashboard/addproduct'} style={{textDecoration:'none'}}>
            <ListItem  disablePadding>
              <ListItemButton >
                <ListItemIcon >
                 <InboxIcon />
                </ListItemIcon>
                <ListItemText primary='Add Product' />
              </ListItemButton>
            </ListItem>
            </NavLink>
        </List>
        <Divider />
        {/* <List>
          {['Add wholeseller', 'Complains'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        {/* Table  */}

   <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            
            <TableCell align="right">Product</TableCell>
            <TableCell align="right">Manufacture</TableCell>
            <TableCell align="right">Supplier</TableCell>
            <TableCell align="right">Distributer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {manufactureData.map((data,i)=>
          {
            return(
            <TableRow
            key={i + 1}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align='right'>{data?.Product_Name}</TableCell>
            <TableCell align='right'>{data?.manufacturers?.Manufacturer_Name}</TableCell>
            <TableCell align='right'>{data?.suppliers?.Supplier_Name}</TableCell>
            <TableCell align='right'>{data?.distributors?.Distributor_Name}</TableCell>
            </TableRow>
           )
         } )}
        </TableBody>
      </Table>
    </TableContainer> 
       
        

    
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
      </Main>
    </Box>
  );
}
