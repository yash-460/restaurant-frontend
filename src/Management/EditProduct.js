import { CheckBox, PhotoCamera } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Checkbox, FormControl, FormControlLabel, Paper, TextField } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Auth } from "../util/auth";
import { Path } from "../util/Constants";
import { ErrorMessage } from "../util/errorMessage";
import { UploadButton } from "../util/UIComponent";

/**
 * this component contains logic and functionality to edit existing product
 * @returns UI to add product
 */
function EditProduct(){

    // Inital state
    const location = useLocation();
    const [form,setForm] = useState({
        productId: location.state.productId,
        productName: location.state.productName,
        storeId:location.state.storeId,
        description:location.state.description,
        price:location.state.price,
        active:location.state.active,
        imgLoc:location.state.imgLoc
    });
    const [errorMessage,setErrorMessage] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    // change state variable for form input
    function handleChange(e){
        const { name, value } = e.target;
        if(name === "price"){
            setForm({...form, [name] :parseFloat(value)});
        }else{
            setForm({...form, [name] :value});
        }
    }
    
    // send put request to edit the product
    async function SubmitForm(e){
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);
        try{
            let response = await axios.put(
                Path.storeService + "/Product/" + form.productId,
                form,{
                    headers:{
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
                }           
            );
            navigate("/Management"); // On success
        }catch (error){
            setLoading(false);
            setErrorMessage(ErrorMessage.contactSupport);
        }
    }

    // render UI to edit product
    return (
        <Container fixed >
            <Paper elevation={2} style={{margin:"auto",marginTop:"50px",padding:"10px 50px", width:"max-content"}}>               
            <h2 style={{textAlign:"center"}}>Edit Product</h2>
                <form onSubmit={SubmitForm}>
                <TextField value={form.productName} required label="Name" name="productName" onChange={handleChange} size="small" margin="dense" inputProps={{size:"40"}}/>
                <br/>
                <TextField value={form.description} required label="Description" name="description" onChange={handleChange} size="small" margin="dense" inputProps={{size:"40",maxLength:100}}/>
                <br/>
                <TextField value={form.price} required label="Price" type="number" name="price" onChange={handleChange} size="small" margin="dense" inputProps={{size:"10"}}/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FormControlLabel sx={{marginTop:"4px"}} control={<Checkbox name="active" checked={form.active} onChange={(e)=>setForm({...form,active: e.target.checked})} />} label="active"/>
                <br/>
                <UploadButton handleUpload={(content)=> setForm({...form,imgLoc:content})} removeUpload={()=>setForm({...form,imgLoc:""})}/>
                <br/>
                <LoadingButton loading={loading} type="submit" variant="contained" size="small" sx={{margin:"10px"}}>Save</LoadingButton>
                <span style={{color:"red",fontSize:"8pt"}}>{errorMessage}</span> 
            </form>
            </Paper>
        </Container>
    );
}

export {EditProduct};