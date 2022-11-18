import { PhotoCamera, Upload } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Paper, TextField } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../util/auth";
import { Path } from "../util/Constants";
import { ErrorMessage } from "../util/errorMessage";
import { UploadButton } from "../util/UIComponent";

function AddProduct(){

    const [form,setForm] = useState({productName:"",storeId:0,description:"",price:1.0,imgLoc:""});
    const [errorMessage,setErrorMessage] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    function handleChange(e){
        const { name, value } = e.target;
        if(name === "price"){
            setForm({...form, [name] :parseFloat(value)});
        }else{
            setForm({...form, [name] :value});
        }
    }

    async function SubmitForm(e){
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);
        if(Auth.getJWT()){
            let storeId = JSON.parse(atob(Auth.getJWT().split(".")[1])).Store;
            setForm({...form, storeId:parseInt(storeId)});
        }else{
            console.log("token not found");
            return;
        }
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
            setLoading(false);
            setErrorMessage(ErrorMessage.contactSupport);
        }
    }


    return (
        <Container fixed >
            <Paper elevation={2} style={{margin:"auto",marginTop:"50px",padding:"10px 50px", width:"max-content"}}>               
            <h2 style={{textAlign:"center"}}>Add Product</h2>
                <form onSubmit={SubmitForm}>
                <TextField value={form.productName} required label="Name" name="productName" onChange={handleChange} size="small" margin="dense" inputProps={{size:"40"}}/>
                <br/>
                <TextField value={form.description} required label="Description" name="description" onChange={handleChange} size="small" margin="dense" inputProps={{size:"40",maxLength:100}}/>
                <br/>
                <TextField value={form.price} required label="Price" type="number" name="price" onChange={handleChange} size="small" margin="dense" inputProps={{size:"10"}}/>
                <br/>
                <UploadButton handleUpload={(content)=> setForm({...form,imgLoc:content})} removeUpload={()=>setForm({...form,imgLoc:""})}/>
                <br/>
                <LoadingButton loading={loading} type="submit" variant="contained" size="small" sx={{margin:"10px"}}>Add</LoadingButton>
                <span style={{color:"red",fontSize:"8pt"}}>{errorMessage}</span> 
            </form>
            </Paper>
        </Container>
    );
}

export {AddProduct};