import { Button, IconButton, Paper, Tooltip } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box"
import { BrowserRouter, Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import RoomServiceIcon from '@mui/icons-material/RoomService';

export function CustomerNav(){
    const iconStyle = {color:"black"};
    return (
        <Box>
            <Paper sx={{display:"flex", padding:" 12px 18px"}} square>
                <div>
                    <Link to="/" >LOGO</Link>
                </div>
                <div style={{marginLeft:"auto",}}>                                 
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
                        <Link to="/Profile">
                            <Tooltip title="Profile">
                            <IconButton><AccountCircleIcon style={iconStyle}/></IconButton>
                            </Tooltip>
                        </Link>                                 
                </div>
            </Paper>
        </Box>
    );
}

export function OwnerNav(){
    const iconStyle = {color:"black"};
    return(
        <Box>
            <Paper sx={{display:"flex", padding:" 12px 18px"}} square>
                <div>
                    <Link to="/Management" >LOGO</Link>
                </div>
                <div style={{marginLeft:"auto"}}>                                                       
                        <Link to="Management/Orders">
                            <Tooltip title="Live Orders">
                            <IconButton><RoomServiceIcon style={iconStyle}/></IconButton>
                            </Tooltip>
                        </Link>
                        <Link to="Management/Profile">
                            <Tooltip title="Profile">
                            <IconButton><AccountCircleIcon style={iconStyle}/></IconButton>
                            </Tooltip>
                        </Link>                                 
                </div>
            </Paper>
        </Box>
    );
}