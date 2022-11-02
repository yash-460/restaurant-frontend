import { PhotoCamera } from "@mui/icons-material";
import { Button, Paper, TextField } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../util/auth";
import { Path } from "../util/Constants";
import { ErrorMessage } from "../util/errorMessage";

function AddProduct(){

    const [form,setForm] = useState({productName:"",storeId:1,description:"",price:0.0,imgLoc:""});
    const [errorMessage,setErrorMessage] = useState("");
    const [btnDisabled,setBtnDisabled] = useState(false);
    const navigate = useNavigate();

    function handleChange(e){
        const { name, value } = e.target;
        if(name == "price")
            setForm({...form, [name] :parseFloat(value)});
        else
            setForm({...form, [name] :value});
    }

    async function SubmitForm(){
        setErrorMessage("");
        setBtnDisabled(true);
        try{
            let response = await axios.post(
                Path.storeService + "/Product",
                form,{
                    headers:{
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
                }           
            );
            navigate("/Management");
        }catch (error){
            setBtnDisabled(false);
            setErrorMessage(ErrorMessage.contactSupport);
        }
    }


    return (
        <Container fixed >
            <Paper elevation={2} style={{margin:"auto",marginTop:"50px",padding:"10px 50px", width:"max-content"}}>               
            <h2 style={{textAlign:"center"}}>Add Product</h2>
            <TextField value={form.productName} required label="Name" name="productName" onChange={handleChange} size="small" margin="dense" inputProps={{size:"40"}}/>
            <br/>
            <TextField value={form.description} label="Description" name="description" onChange={handleChange} size="small" margin="dense" inputProps={{size:"40"}}/>
            <br/>
            <TextField value={form.price} required label="Price" type="number" name="price" onChange={handleChange} size="small" margin="dense" inputProps={{size:"10"}}/>
            <br/>
            <Button variant="contained" size="small" component="label" startIcon={<PhotoCamera />}>
                Upload
                <input hidden accept="image/*" name="imgLoc" multiple type="file" />
            </Button>
            <br/>
            <Button disabled={btnDisabled} variant="contained" size="small" sx={{margin:"10px"}} onClick={SubmitForm}>Add</Button>
            <span style={{color:"red",fontSize:"8pt"}}>{errorMessage}</span> 
            </Paper>
        </Container>
    );
}

export {AddProduct};