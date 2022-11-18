import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Skeleton, TextareaAutosize } from "@mui/material";
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
    const [tax,setTax] = useState(null);

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
            setCart(response.data?.$values);
            
            if(response.data?.$values.length){
                try{
                    let taxResponse = await axios.get(`${Path.storeService}/Store/tax/${response.data?.$values[0].product.storeId}`);
                    setTax(taxResponse.data);
                }catch(error){
                    console.log("error fetching tax rate");
                    console.log(error);
                }
               
            }
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
                <span style={{margin:"auto",display:"flex",fontSize:"x-large"}}>&#215; <span>{item.quantity}</span></span>&nbsp;&nbsp;
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

    function displayBill(){
        let totalAmount = 0;
        for(let i = 0; i < cart.length;i++){
            totalAmount += cart[i].product.price * cart[i].quantity;
        }
        return (
            <div style={{padding:"25px",margin:"auto",maxWidth:"fit-content"}}>
                <div style={{margin:"auto",maxWidth:"fit-content"}}>
                <p><b>Amount:</b> {totalAmount}</p>
                <p><b>Tax:</b> {tax}</p>
                <p><b>Total:</b> {((tax * totalAmount)/100 + totalAmount).toFixed(2)}</p>
                </div>
                <Button variant="contained" onClick={Pay} >Proceed to Pay</Button>
            </div>
        );
    }

    async function Pay(){
        try{
            let response = await axios.post(
                Path.OrderService + "/Orders",
                {},{
                headers:{
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            });
            console.log("done");
        }catch(error){
            console.log(error);
        }
        
    }

    return (
        <div>
            {failed ? <h1 style={{textAlign:"center"}}>{ErrorMessage.contactSupport}</h1> : (
                <Container style={{marginTop:"30px"}}>
                    <h1 style={{textAlign:"center"}}>Checkout</h1>
                    {loading ? Array(4).fill(null).map((u,i)=> dispalySkeleton(i)) : (
                        cart.length ? ( cart.map((item) => displayProduct(item))) : <h2 style={{textAlign:"center"}}>Nothing inside cart </h2>
                    )}          
                    {tax !== null ? displayBill() : ""}
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