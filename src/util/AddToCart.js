import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { LoadingButton } from "@mui/lab";
import { Button, CardMedia, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import img from "../img/img.png";
import { Auth } from "./auth";
import { Path } from "./Constants";
import { ErrorMessage } from "./errorMessage";

export function AddToCart(props){
    const [loading,setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [form,setForm] = useState({
        productId:0,
        quantity:1,
        instruction:""
    });
    
    function handleChange(e){
        const { name, value } = e.target;
        setForm({...form, [name] :value});
    }
    async function submitForm(e){
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        form.productId = props.product.productId;
        try{
            let response = await axios.post(
                Path.storeService + "/Cart",
                form,{
                    headers:{
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
                }
            );
            props.handleClose();
            form.instruction = "";
        }catch(error){
            console.log(error);
            if(error.response.status === 409)
                setErrorMessage(error.response.data);
            else
                setErrorMessage(ErrorMessage.contactSupport);
        }
        setLoading(false);

    }
    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose} sx={{textAlign:"center"}} maxWidth="xs">
                <DialogTitle>
                    <CardMedia component="img" sx={{maxWidth:"250px",margin:"auto"}} image={props.product.imgLoc ? props.product.imgLoc : img}/>   
                </DialogTitle>
                <DialogContent>
                    <b>{props.product.productName}</b><br/>
                    <span style={{wordBreak:"break-word", maxWidth:"100%"}}>{props.product.description}</span> <br/>                  
                    <form style={{marginTop:"10px"}} onSubmit={submitForm}>
                        <TextField type="text" name="instruction" label="Special Instruction" size="small" value={form.instruction} onChange={handleChange} inputProps={{size:"30",maxLength:100}}/>
                        <br/>
                        <TextField type="number" label="Qty" name="quantity" value={form.quantity} size="small" onChange={handleChange} inputProps={{min:1}} sx={{m:1,width:'10ch'}}/>
                        <LoadingButton loading={loading} variant="contained" type="submit" sx={{marginTop:"10px"}} startIcon={<ShoppingCartIcon/>}>Add</LoadingButton>
                        <br/><span style={{color:"red",fontSize:"8pt"}}>{errorMessage}</span> 
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}