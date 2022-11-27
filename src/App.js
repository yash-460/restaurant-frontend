/**
 * I Yash Chaudhary, 000820480 certify that this material is my original work.
 * No other person's work has been used without due acknowledgement. 
 * I have not made my work available to anyone else.
 */
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
    <br/><br/><br/>
    <Outlet/>
  </div>);
}

function OwnerHeader(){
  return(
    <div>
      <OwnerNav/>
      <br/><br/><br/>
      <Outlet/>
    </div>
  );
}

function App() {

  return (
    <div style={{backgroundColor:"#ececec",height:"100%",minHeight:"100vh"}}>
      <BrowserRouter>
        <Routes>
          <Route element={<CustomerHeader/>}>
              <Route path="/" element={<Home/>} ex/>
              <Route path="/Store/:storeId" element={<Restaurant/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/SignUp" element={<Signin />}/>
              <Route path="/Cart" element={
                <RequireLogin  customerUserOnly={true}>
                  <Cart/>
                </RequireLogin>
              }/>
              
              <Route path="/Orders" element={
                <RequireLogin customerUserOnly={true}>
                  <Order/>
                </RequireLogin>
              }/>

              <Route path="/favourite" element={
                <RequireLogin  customerUserOnly={true}>
                  <FavouritePage/>
                </RequireLogin>
              }/>

              <Route path="/Profile" element={
                <RequireLogin customerUserOnly={true}>
                  <UserProfile/>
                </RequireLogin>
              }/>
          </Route>

          <Route path="/Register" element={
            <RequireLogin customerUserOnly={true}>
              <RegisterRestaurant/>
            </RequireLogin>
          }/>
          <Route element={< OwnerHeader/>}>
              <Route path="/Management" element={
                <RequireLogin ownerUserOnly={true}>
                  <RestaurantHome/>
                </RequireLogin>
              }/>
            
              <Route path="/Management/Edit" element={
                <RequireLogin ownerUserOnly={true}>
                  <EditRestaurant/>
                </RequireLogin>
              }/>
              <Route path="/Management/Add" element={
                <RequireLogin ownerUserOnly={true}>
                  <AddProduct/>
                </RequireLogin>
              }/>
              <Route path="/Management/product" element={
                <RequireLogin ownerUserOnly={true}>
                  <EditProduct/>
                </RequireLogin>
              }/>
              <Route path="/Management/Orders" element={
                <RequireLogin ownerUserOnly={true}>
                  <LiveOrder/>
                </RequireLogin>
              }/>
              <Route path="/Management/Report" element={
                <RequireLogin ownerUserOnly={true}>
                  <Report/>
                </RequireLogin>
              }/>
              <Route path="Management/Profile" element={
                <RequireLogin ownerUserOnly={true}>
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
