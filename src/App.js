import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AddProduct } from './Management/AddProduct';
import { EditRestaurant } from './Management/EditRestaurant';
import RestaurantHome from './Management/Home';
import { RegisterRestaurant } from './Management/RegisterRestaurant';
import Nav from './Nav';
import Home from './pages/Home';
import { Login, Signin } from './pages/Login';
import Restaurant from './pages/Restaurant';
import {RequireLogin} from './util/auth';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home/>} ex/>
          <Route path="/Store/:storeId" element={<Restaurant/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/SignUp" element={<Signin />}/>

          
          <Route path="/Management" element={<RestaurantHome/>}/>
          <Route path="/Register" element={
            <RequireLogin>
              <RegisterRestaurant/>
            </RequireLogin>
          }/>
          <Route path="/Management/Edit" element={
            <RequireLogin>
              <EditRestaurant/>
            </RequireLogin>
          }/>
          <Route path="/Management/Add" element={
            <RequireLogin>
              <AddProduct/>
            </RequireLogin>
          }/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
