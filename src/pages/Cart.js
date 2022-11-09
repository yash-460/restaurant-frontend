import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { RectangularCard } from "../util/UIComponent";
import { Path } from "../util/Constants";
import { Auth } from "../util/auth";
import { ErrorMessage } from "../util/errorMessage";
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from "@mui/lab";

export function Cart(){
    
    const [cart,setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [failed,setFailed] = useState(false);
    const [dialogOpen,setDialogOpen] = useState(false);
    const [removeProductId, setRemoveProductId] = useState(0);
    const [btnLoading,setBtnLoading] = useState(false);

    useEffect(()=>{
        fetchCart();
    },[]);

    async function fetchCart(){
        try{
            let response = await axios.get(
                Path.storeService + "/Cart",{
                    headers:{
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
                }
            );
            console.log(response);
            setCart(response.data?.$values);
        }catch(error){
            console.log(error);
            setFailed(true);    
        }
        setLoading(false);
    }

    function dispalySkeleton(i){
        return(
            <Paper key={i} sx={{display:"flex",flexDirection:"column",backgroundColor:"rgb(251 251 251)",margin:"auto",padding:"15px",maxWidth:"700px",borderRadius:"10px",marginTop:"30px"}}>              
                <Skeleton sx={{width:"40%"}}/>
                <Skeleton sx={{width:"70%"}}/>
                <Skeleton sx={{width:"20%"}}/>
            </Paper>
        );
    }

    function displayProduct(item){
        let body = <span style={{wordBreak:"break-word"}}>{item.product.description} <br/><i><b>${item.product.price}</b></i> </span>;
        
        return (
            <RectangularCard key={item.product.productId} header={item.product.productName} body={body}>
                <IconButton onClick={()=>{
                    setDialogOpen(true);
                    setRemoveProductId(item.product.productId);
                }}>
                    <DeleteIcon/>
                </IconButton>
            </RectangularCard>
        );
    }

    async function removeItem(){
        try{
            setBtnLoading(true);
            let response = await axios.delete(
                Path.storeService + `/Cart/${removeProductId}`,{
                    headers:{
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
                }
            );
            setCart(cart.filter((item)=> item.productId !== removeProductId));
            setDialogOpen(false);
        }catch(error){
            console.log(error);
        }
        setBtnLoading(false);
    }

    return (
        <div>
            {failed ? <h1 style={{textAlign:"center"}}>{ErrorMessage.contactSupport}</h1> : (
                <Container style={{marginTop:"30px"}}>
                    <h1 style={{textAlign:"center"}}>Checkout</h1>
                    {loading ? Array(4).fill(null).map((u,i)=> dispalySkeleton(i)) : (
                        cart.length ? ( cart.map((item) => displayProduct(item))) : <h2>Nothing inside cart </h2>
                    )}
                    <Dialog open={dialogOpen} onClose={()=>setDialogOpen(false)}>
                        <DialogTitle>Sure you want Remove product from Cart?</DialogTitle>
                        <DialogActions>
                            <LoadingButton loading={btnLoading} onClick={()=> removeItem()}>Yes</LoadingButton>
                            <Button onClick={()=>setDialogOpen(false)}>No</Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            )}
        </div>
    );
}