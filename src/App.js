import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AddProduct } from './Management/AddProduct';
import { EditProduct } from './Management/EditProduct';
import { EditRestaurant } from './Management/EditRestaurant';
import RestaurantHome from './Management/Home';
import { RegisterRestaurant } from './Management/RegisterRestaurant';
import Nav from './Nav';
import { Cart } from './pages/Cart';
import { FavouritePage } from './pages/Favourite';
import Home from './pages/Home';
import { Login, Signin } from './pages/Login';
import Restaurant from './pages/Restaurant';
import { UserProfile } from './pages/UserProfile';
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

          <Route path="/Cart" element={
            <RequireLogin>
              <Cart/>
            </RequireLogin>
          }/>

          <Route path="/favourite" element={
            <RequireLogin>
              <FavouritePage/>
            </RequireLogin>
          }/>

          <Route path="/Profile" element={
            <RequireLogin>
              <UserProfile/>
            </RequireLogin>
          }/>

          <Route path="/Management" element={
            <RequireLogin>
              <RestaurantHome/>
            </RequireLogin>
          }/>
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
          <Route path="/Management/product" element={
            <RequireLogin>
              <EditProduct/>
            </RequireLogin>
          }/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}


export default App;
