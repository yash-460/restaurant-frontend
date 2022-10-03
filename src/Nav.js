import { Paper } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box"
import { BrowserRouter, Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

function Nav(){
    const iconStyle = {color:"black",padding:"0 10px"};
    return (
        <Box>
            <Paper sx={{display:"flex", padding:"10px"}} square>
                <BrowserRouter style={{}}>  
                <div>
                    <Link to="/" >LOGO</Link>
                </div>
                <div style={{marginLeft:"auto",}}>
                                     
                        <Link to="/Cart"><ShoppingCartIcon style={iconStyle} /></Link>
                        <Link to="/Favorite"><BookmarksIcon style={iconStyle}/></Link>
                        <Link to="/Orders"><ReceiptIcon style={iconStyle}/></Link>
                        <Link to="/Profile"><AccountCircleIcon style={iconStyle}/></Link>
                                      
                </div>
                </BrowserRouter>  
            </Paper>
        </Box>
    );
}

export default Nav;