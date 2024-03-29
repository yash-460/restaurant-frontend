import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { LoadingButton } from "@mui/lab";
import { Button, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import img from "../img/img.png";
import { Auth } from "./auth";
import { Path } from "./Constants";
import { ErrorMessage } from "./errorMessage";

/**
 * This is contains logic for displaying cart dialog
 */
export function CartDialog(props){
    const [loading,setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [form,setForm] = useState({
        productId:0,
        quantity:1,
        instruction: ""
    });
    const location = useLocation();
    const navigate = useNavigate();

    function handleChange(e){
        const { name, value } = e.target;
        setForm({...form, [name] :value});
    }

    async function submitForm(e){
        e.preventDefault();
        if(!Auth.getJWT()){
            navigate(`/login?${location.pathname.replace('/','')}`);
        }
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
            <Dialog open={props.open} onClose={props.handleClose} sx={{textAlign:"center",maxWidth:"450px",margin:"auto"}}>
                <DialogTitle>
                    <CardMedia component="img" sx={{margin:"auto",borderRadius:"5px"}} height="220" image={props.product.imgLoc ? ("data:image/*;base64, " + props.product.imgLoc) : img}/>   
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

export function CartEditDialog(props){

    const [item,setItem] = useState({userName:"",productId:1,quantity:1,instruction:""});
    const [loading, setLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");

    useEffect(()=>{
        if(props.item.productId){
            setItem({...item,quantity:props.item.quantity,instruction:props.item.instruction,productId:props.item.productId,userName:props.item.userName});
        }
    },[props.item]);

    function handleChange(e){
        let { name, value } = e.target;
        if(name === "quantity")
            value = parseInt(value);
        setItem({...item,[name]:value});
    }

    function changeCartItem(){
        setLoading(true);
        setErrorMessage("");
        try{
            let response = axios.put(Path.OrderService + "/Cart",
                item,{
                    headers:{
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
                });
            props.handleEdit(item);
            props.handleClose();
        }catch(error){
            setErrorMessage(ErrorMessage.contactSupport);
        }
        setLoading(false);
    }

    return(
        <Dialog open={props.open} onClose={props.handleClose} sx={{maxWidth:"450px",margin:"auto"}}>
            <DialogTitle sx={{textAlign:"center"}}>Edit Product</DialogTitle>
            <DialogContent>
                <b style={{display:"inline-block", marginBottom:"10px"}}>Product:</b> {props.item.product ? props.item.product.productName : ""}
                <br/>
                <TextField type="text" name="instruction" label="Special Instruction" size="small" value={item.instruction} onChange={handleChange} inputProps={{size:"30",maxLength:100}}/>
                <br/>
                <TextField type="number" label="Qty" name="quantity" value={item.quantity} size="small" onChange={handleChange} inputProps={{min:1}} sx={{m:1,width:'10ch'}}/>
                <br/><span style={{color:"red",fontSize:"8pt"}}>{errorMessage}</span>
                <LoadingButton loading={loading} onClick={changeCartItem} sx={{margin:"auto",marginTop:"10px",display:"block"}}>Edit</LoadingButton>    
            </DialogContent>
        </Dialog>
    );
}