import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../components/SignIn/Login";
import SignUp from "../components/SignUp/SignUp";
import Home from "./Home/Home";
// import { AppRoutes } from './routes/routes';
// import useAuth from './hooks/useAuth';

import { useForm } from "react-hook-form";
import Distributer from "./Distributer/Distributer";
import Manufacturer from "./Manufacturer/Manufacturer";
import Dashboard from "../components/Dashboard/Dashboard";
import AddProduct from '../components/Dashboard/AddProduct';
import AddManufacture from '../components/Dashboard/AddManufacture'
import AddSupplier from '../components/Dashboard/AddSupplier'
import AddDisributer from '../components/Dashboard/AddDisributer'
function App() {
 
  return (<>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/sign-in' element={<SignIn />} />
    <Route path='/sign-up' element={<SignUp />} />
    <Route path='/distributer' element={<Distributer />} />
    <Route path='/manufacturer' element={<Manufacturer />} />
    <Route path='/dashboard' element={<Dashboard/>} />
    <Route path='/dashboard/addproduct' element={<AddProduct/>} />
    <Route path='/dashboard/addmanufacture' element={<AddManufacture/>} />
    <Route path='/dashboard/addsupplier' element={<AddSupplier/>} />
    <Route path='/dashboard/adddistributor' element={<AddDisributer/>} />
    
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
