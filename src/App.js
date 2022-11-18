import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import { AddProduct } from './Management/AddProduct';
import { EditProduct } from './Management/EditProduct';
import { EditRestaurant } from './Management/EditRestaurant';
import RestaurantHome from './Management/Home';
import { LiveOrder } from './Management/LiveOrder';
import { RegisterRestaurant } from './Management/RegisterRestaurant';
import { Report } from './Management/Report';
import { CustomerNav, OwnerNav } from './Nav';
import { Cart } from './pages/Cart';
import { FavouritePage } from './pages/Favourite';
import Home from './pages/Home';
import { Login, Signin } from './pages/Login';
import { Order } from './pages/Order';
import Restaurant from './pages/Restaurant';
import { UserProfile } from './pages/UserProfile';
import {RequireLogin} from './util/auth';

function CustomerHeader(){
  return(<div>
    <CustomerNav/>
    <Outlet/>
  </div>);
}

function OwnerHeader(){
  return(
    <div>
      <OwnerNav/>
      <Outlet/>
    </div>
  );
}

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<CustomerHeader/>}>
              <Route path="/" element={<Home/>} ex/>
              <Route path="/Store/:storeId" element={<Restaurant/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/SignUp" element={<Signin />}/>
              <Route path="/Cart" element={
                <RequireLogin>
                  <Cart/>
                </RequireLogin>
              }/>
              
              <Route path="/Orders" element={
                <RequireLogin>
                  <Order/>
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
          </Route>

          <Route path="/Register" element={
            <RequireLogin>
              <RegisterRestaurant/>
            </RequireLogin>
          }/>
          <Route element={< OwnerHeader/>}>
              <Route path="/Management" element={
                <RequireLogin>
                  <RestaurantHome/>
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
              <Route path="/Management/Orders" element={
                <RequireLogin>
                  <LiveOrder/>
                </RequireLogin>
              }/>
              <Route path="/Management/Report" element={
                <RequireLogin>
                  <Report/>
                </RequireLogin>
              }/>
              <Route path="Management/Profile" element={
                <RequireLogin>
                  <UserProfile/>
                </RequireLogin>
              }/>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}


export default App;
