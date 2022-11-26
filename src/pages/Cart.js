import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Paper, Select, Skeleton, TextareaAutosize } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { RectangularCard } from "../util/UIComponent";
import { Path } from "../util/Constants";
import { Auth } from "../util/auth";
import { ErrorMessage } from "../util/errorMessage";
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { CartDialog } from "../util/CartDialog";
import { Payment } from "../util/Payment";


/**
 * Render cart of the specified user
 * @returns UI displaying the cart
 */
export function Cart(){
    
    const [cart,setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [failed,setFailed] = useState(false);
    const [dialogOpen,setDialogOpen] = useState(false);
    const [removeProductId, setRemoveProductId] = useState(0);
    const [btnLoading,setBtnLoading] = useState(false);
    const [tax,setTax] = useState(null);
    const [displayPaymentDialog,setDisplayPaymentDialog] = useState(false);
    const [cartPaymentItems,setCartPaymentItems] = useState([]);

    const navigate = useNavigate();

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

    // for paypal payment processing
    function createCartItems(){
        let items = {total: 0,items:[]};
        cart.forEach(item => {
            let itemPrice = Math.round((item.product.price + ((tax * item.product.price)/100)) *100)/100;
            items.items.push({
                name: item.product.productName,
                unit_amount: {
                    currency_code: "CAD",
                    value: itemPrice
                },
                quantity: item.quantity
            });
            items.total = items.total + (itemPrice * item.quantity);
        });
        items.total = Math.round(items.total*100)/100;
        setCartPaymentItems(items);
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
        let body = <span style={{wordBreak:"break-word"}}><b><i>Instruction</i></b>: {item.instruction} <br/><i><b>${item.product.price}</b></i> </span>;
        
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
                <p><b>Amount:</b> {totalAmount.toFixed(2)}</p>
                <p><b>Tax:</b> {tax} %</p>
                <p><b>Total:</b> {((tax * totalAmount)/100 + totalAmount).toFixed(2)}</p>
                </div>
                <Button variant="contained" onClick={()=> {createCartItems();setDisplayPaymentDialog(true);}} >Proceed to Pay</Button>
            </div>
        );
    }

    function displayDeleteDialog(){
        return (
            <Dialog open={dialogOpen} onClose={()=>setDialogOpen(false)}>
                <DialogTitle>Sure you want Remove product from Cart?</DialogTitle>
                <DialogActions>
                    <LoadingButton loading={btnLoading} onClick={()=> removeItem()}>Yes</LoadingButton>
                    <Button onClick={()=>setDialogOpen(false)}>No</Button>
                </DialogActions>
            </Dialog>
        );
    }

    async function CreateOrder(id){
        try{
            let response = await axios.post(
                Path.OrderService + "/Orders",
                {transactionId:id},{
                headers:{
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            });
            navigate("/orders");
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
                    {tax !== null && cart.length ? displayBill() : ""}
                    {displayDeleteDialog()}
                    {displayPaymentDialog ? <Payment CreateOrder={CreateOrder} open={displayPaymentDialog} items={cartPaymentItems} handleClose={()=> setDisplayPaymentDialog(false)}/>: ""}
                </Container>
            )}
        </div>
    );
}