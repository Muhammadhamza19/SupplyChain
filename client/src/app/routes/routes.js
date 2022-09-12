import Home from '../views/Home/Home';
import SignIn from '../components/SignIn/Login';
import SignUp from '../components/SignUp/SignUp';
import Sidenav from '../layout/Sidenav';
import Distributer from '../views/Distributer/Distributer';
import Manufacturer from '../views/Manufacturer/Manufacturer';
import Supplier from '../views/Supplier/Supplier';
export const AppRoutes = [
    {
        path: "/",
        Element: <Home />
    },
    {
        path: "/sign-in",
        component: <SignIn />
    },
    {
        path: "/sign-up",
        component: <SignUp />
    },
    {
        path: "/distributer",
        component: <Distributer />
    },
    {
        path: "/manufacturer",
        component: <Manufacturer />
    },
    {
        path: "/side-nav",
        component: <Sidenav />
    },
    {
        path: "/supplier",
        component: <Supplier />
    },
]