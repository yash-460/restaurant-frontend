import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Secret } from "./Constants";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export function Payment(props) {
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    const [success,setSuccess] = useState(false);

    // creates a paypal order
    const createOrder = (data, actions) => {
    return actions.order
        .create({
        purchase_units: [
            {
            description: "Sunflower",
            amount: {
                currency_code: "CAD",
                value: props.items.total,
                breakdown: {
                    item_total: {
                      currency_code: "CAD",
                      value: props.items.total,
                    },
                },
            },
            items: props.items.items
            },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
            shipping_preference: "NO_SHIPPING",
        },
        }).then((orderID) => {
        setOrderID(orderID);
        return orderID;
        });
    };
    
    // check Approval
    const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
        const transaction = details.purchase_units[0].payments.captures[0];
        setSuccess(true);
        props.CreateOrder(transaction.id);
    });
    };
    //capture likely error
    const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
    };

    return (    
        <Dialog open={props.open} onClose={props.handleClose} scroll='body' fullWidth={true} maxWidth={'sm'}>
        <DialogTitle style={{textAlign:"center",fontSize:"18pt"}}><b>Payment</b>
            <DialogActions style={{display:"inline-block",width:"fit-content",float:"right"}}>
                <IconButton edge="start" onClick={props.handleClose}><CloseIcon /></IconButton>
            </DialogActions>
        </DialogTitle>
        <DialogContent style={{margin:"auto"}}>
            {success ? <span style={{color:"green",fontSize:"14pt"}}>Payment Successfull!</span> : ""}
            <PayPalScriptProvider options={{
                "client-id": Secret.payPalClientId,
                "currency": "CAD"
            }}> 
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createOrder}
                    onApprove={onApprove}/>
            </PayPalScriptProvider>
        </DialogContent>
    </Dialog>
    );
}