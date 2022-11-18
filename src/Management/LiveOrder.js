import { ProductionQuantityLimits } from "@mui/icons-material";
import { Button, Chip, Paper } from "@mui/material";
import { display } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { Auth } from "../util/auth";
import { Path } from "../util/Constants";
import { ErrorMessage } from "../util/errorMessage";
import SuccessSnackbars, { RectangularCard } from "../util/UIComponent";
import DoneIcon from '@mui/icons-material/Done';
import { LoadingButton } from "@mui/lab";


function DisplayOrder(props){

    const [btnLoading,setBtnLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const [open,setOpen] = useState(false);

    function MarkCompleted(){
        setBtnLoading(true);
        setErrorMessage("");
        try{
            let response = axios.put(
                `${Path.OrderService}/Orders/markDone/${props.order.orderId}`,
                    null,{
                    headers:{
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
                });
            props.MarkCompleted(props.order.orderId);
        }catch(error){
            console.log(error);
            setErrorMessage(ErrorMessage.contactSupport);
        }
        setBtnLoading(false);
    }

    function displayProduct(product){
        let body = (
            <div>
                <span style={{wordBreak:"break-word"}}>{product.instruction ? product.instruction : "No special Instruction"}</span><br/>
                <span>{product.quantity} Qty</span>
            </div>
        );
        return (
            <RectangularCard key={product.productId} header={product.product.productName} body={body}>
                <Chip variant="outlined" deleteIcon={<DoneIcon />} label="Done" onDelete={()=>{}} />
            </RectangularCard>
        );
    }

    return(
        <Paper elevation={3} sx={{margin:"auto",marginTop:"40px",maxWidth:"800px",padding:"20px"}} >
            <div style={{textAlign:"center"}}>
                <h2 style={{display:"inline-block",margin:'0px',float:"left"}}>#{props.order.orderId}</h2> 
                <LoadingButton loading={btnLoading} color="success" variant="outlined" onClick={MarkCompleted}>Ready To Pickup</LoadingButton>
            </div>
            <span style={{color:"red",fontSize:"10pt"}}>{errorMessage}</span> 
            {props.order.orderDetails.$values.map( p => displayProduct(p))}
            <SuccessSnackbars open={open} close={()=> setOpen(false)} message={"Order Completed Successfully!"}/>
        </Paper>
    );
}

export function LiveOrder(){

    const [loading, setLoading] = useState(true);
    const [failed,setFailed] = useState(false);
    const [orders,setOrders] = useState([]);

    useEffect(()=>{
        fetchOrders();
    },[]);

    async function fetchOrders(){
        let storeId = JSON.parse(atob(Auth.getJWT().split(".")[1])).Store;
        if(!storeId){
            setFailed(true);
            console.log("token not found");
            return;
        }
        try{
            let response = await axios.get(`${Path.storeService}/Orders/Store/${storeId}`,{
                headers:{
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            });
            console.log(response);
            setOrders(response.data?.$values)
        }catch(error){
            console.log(error);
            setFailed(true);
        }
        setLoading(false);
    }

    function MarkCompleted(orderId){
        setOrders(orders.filter(o => o.orderId !== orderId));
    }

    return(
        <div>
        {failed ? <h1 style={{textAlign:"center"}}>{ErrorMessage.contactSupport}</h1> : (
            <div>
            <h1 style={{textAlign:"center"}}>Live Orders</h1>
            {loading ? <h2 style={{textAlign:"center"}}>Loading....</h2> : (
                orders.length ? orders.map(o => <DisplayOrder key={o.orderId} order={o} MarkCompleted={MarkCompleted}/>) : <h2 style={{textAlign:"center"}}>No Order Pending!</h2>
            )}
            </div>       
        )}
        </div>
    );
}