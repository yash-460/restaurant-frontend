import { Button, IconButton, Paper, Tooltip } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box"
import { BrowserRouter,useNavigate, Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import logo from './img/logo.jpg';
import './App.css';
import { Auth } from "./util/auth";

const iconStyle = {color:"black",fontSize:"27px"};

function Profile(props){
    const navigate = useNavigate();
    function logout(){
        sessionStorage.removeItem('jwtToken');
        navigate("/");
    }
    return(
        <div className="dropdown">
            <IconButton>
                <AccountCircleIcon style={iconStyle}/>                                    
            </IconButton>
            <div className="content">
                <Link to={props.navigateTo}>
                    Profile
                </Link>
                {Auth.getJWT() ? <div onClick={logout}>Logout</div>: ""}
            </div>
        </div>
    );
}

export function CustomerNav(){
    return (
        <Box style={{position:"fixed",top:0,left:0,width:"100%",zIndex:"1"}}>
            <Paper sx={{display:"flex", padding:" 12px 18px"}} square>
                <div>
                    <Link to="/" ><img src={logo} style={{width:"35px",paddingLeft:"10px"}}/></Link>
                </div>
                <div style={{marginLeft:"auto"}}>                                 
                        <Link to="/Cart">
                            <Tooltip title="Cart">
                            <IconButton><ShoppingCartIcon style={iconStyle} /></IconButton>
                            </Tooltip>
                        </Link>
                        <Link to="/Favourite">
                            <Tooltip title="Favourite">
                            <IconButton><BookmarksIcon style={iconStyle}/></IconButton>
                            </Tooltip>
                        </Link>
                        <Link to="/Orders">
                            <Tooltip title="Orders & history">
                            <IconButton><ReceiptIcon style={iconStyle}/></IconButton>
                            </Tooltip>
                        </Link>
                        <Profile navigateTo="/Profile"/>                               
                </div>
            </Paper>
        </Box>
    );
}

export function OwnerNav(){
    return(
        <Box style={{position:"fixed",top:0,left:0,width:"100%",zIndex:"1"}}>
            <Paper sx={{display:"flex", padding:" 12px 18px"}} square>
                <div>
                    <Link to="/Management" ><img src={logo} style={{width:"35px",paddingLeft:"10px"}}/></Link>
                </div>
                <div style={{marginLeft:"auto"}}>                                                       
                        <Link to="Management/Orders">
                            <Tooltip title="Live Orders">
                            <IconButton><RoomServiceIcon style={iconStyle}/></IconButton>
                            </Tooltip>
                        </Link>
                        <Profile navigateTo="Management/Profile"/>                            
                </div>
            </Paper>
        </Box>
    );
}