import './App.css';
import {Login} from './pages/Login';
import { Signin } from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Nav from './Nav';
import { EditRestaurant } from './pages/EditRestaurant';
import { AddProduct } from './pages/AddProduct';
import { Paginator } from './components/Pagination';
import RestaurantHome from './pages/RestaurantHome';
import { RegisterRestaurant } from './pages/RegisterRestaurant';

function App() {
  return (
    <div>
      <Nav/>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="Store/:storeId" element={<RestaurantHome/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
