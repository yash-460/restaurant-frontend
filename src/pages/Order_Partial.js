import { Details, SecurityUpdateWarning } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Rating } from "@mui/material";
import { width } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { Auth } from "../util/auth";
import { Path } from "../util/Constants";
import { RectangularCard } from "../util/UIComponent";
import CloseIcon from '@mui/icons-material/Close';
import { memo } from "react";

export function RateOrder(props){

    const [orderDetails,setOrderDetails] = useState([]);
    const [btnLoading,setBtnLoading] = useState(false);
    
    useEffect(()=>{
        console.log("useEffect Called");
        if(props.order)
            setOrderDetails(props.order?.orderDetails);
    },[props.order]);

    function saveRating(){
        setBtnLoading(true);
        try{
            let response = axios.put(
                Path.OrderService + "/Order/Rate/" + props.orderId,
                {},{
                    headers:{
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
                }        
            );
            props.handleClose();
        }catch(error){
            console.log(error);
        }
        setBtnLoading(false);
    }

    function setRating(productId, rate){
        orderDetails.$values.forEach(od => {
           if( od.productId === productId){
                od.rating = rate
           }
        });
        setOrderDetails({...orderDetails});
    }

    function DisplayProduct(detail){
        let body = <div>$ {detail.price}</div>;
        return (
            <RectangularCard key={detail.productId} header={detail.product.productName} body={body}>
                <Rating name="half-rating" value={detail.rating ? detail.rating : 0} onChange={(event,newVal)=>{setRating(detail.productId, newVal)}} />
            </RectangularCard>
        );
    }
    if(props.order || orderDetails.length){
        console.log("Inside if");
        console.log(props.order);
        console.log(orderDetails);
        return(
            <div>
            { props.order ? (<Dialog open={props.open} onClose={props.handleClose} scroll='body' fullWidth={true} maxWidth={'sm'}>
            <DialogTitle style={{textAlign:"center",fontSize:"18pt"}}><b>Rating</b></DialogTitle>
                <DialogContent>
                    {orderDetails.length !== 0 ? orderDetails.$values.map(od => DisplayProduct(od)) : "n  "}
                </DialogContent>
                <DialogActions>
                    <LoadingButton loading={btnLoading} onClick={saveRating}>Save</LoadingButton>
                    <Button onClick={props.handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>) : ""}
            </div>
        );
    }else {
        console.log("No Order Detail for Rating");
        return; 
    }    
}


export function OrderDetail(props){
    
    function DisplayOrderDetail(od){
        let body=<div>$ {od.price}</div>;
        return (
            <RectangularCard key={od.productId} header={od.product.productName} body={body}>
                <span style={{margin:"auto",display:"flex",fontSize:"x-large"}}>&#215; <span> &nbsp;{od.quantity}</span> <span>&nbsp;</span> qty</span>
            </RectangularCard>
        );
    }
    
    if(props.order){
        let totalAmount = 0;
        for(let i = 0; i < props.order?.orderDetails.$values.length;i++){
            totalAmount += props.order?.orderDetails.$values[i].price * props.order?.orderDetails.$values[i].quantity;
        }
        return (
            <div>
            { props.order ? (<Dialog open={props.open} onClose={props.handleClose} scroll='body' fullWidth={true} maxWidth={'sm'}>
                <DialogTitle style={{textAlign:"center",fontSize:"18pt"}}><b>Order Detail</b>
                    <DialogActions style={{display:"inline-block",width:"fit-content",float:"right"}}>
                        <IconButton edge="start" onClick={props.handleClose}><CloseIcon /></IconButton>
                    </DialogActions>
                </DialogTitle>
                <DialogContent style={{margin:"auto"}}>
                    {props.order?.orderDetails.$values.map(od => DisplayOrderDetail(od))}
                    <div style={{margin:"auto",maxWidth:"fit-content"}}>
                    <p><b>Amount:</b> {totalAmount.toFixed(2)}</p>
                    <p><b>Tax:</b> {props.order?.tax}</p>
                    <p><b>Total:</b> {((props.order?.tax * totalAmount)/100 + totalAmount).toFixed(2)}</p>
                    </div>
                </DialogContent>
            </Dialog>) : ""}
            </div>
        );
    }else{
        console.log("No Order Detail");
        return;
    }
  
}