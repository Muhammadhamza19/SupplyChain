import Box from '@mui/material/Box';
import Sidenav from './Sidenav';


function Layout({children}) {
    return (
        <Box sx={{ display: 'flex' }}>

            <Sidenav />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 6 }}
            >
                {children}
            </Box>
        </Box>
    )


}

export default Layout
