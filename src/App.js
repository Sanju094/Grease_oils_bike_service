
import "./App.css";
import Register from "./Frontend/Register";
import Login from "./Frontend/Login";
import Service from "./Frontend/Service";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Category from "./Frontend/Admin/Category";
import Order from "./Frontend/Admin/Order";
import Userorder from "./Frontend/User/Userorder";
import Navbar from "./Frontend/Navbar";
import UserDetails from "./Frontend/Admin/UserDetails";
import Home from "./Frontend/User/Home";
import Footer from "./Frontend/Footer";
import Profile from "./Frontend/Admin/Profile";
import SeriveDescrip from "./Frontend/User/SeriveDescrip";

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="content-wrap">

      <Routes>
        <Route path='/userorder' element={<Userorder/>}/>
        <Route path="/service" element={<Service/>}/>
        <Route path="/orders" element={<Order/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category" element={<Category/>}/>
        <Route path="/userdetails" element={<UserDetails/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/servdesc" element={<SeriveDescrip/>}/>
      </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
