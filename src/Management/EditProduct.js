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

function EditProduct(){

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
    const [uploadFileName,setUploadFileName] = useState();


    function handleChange(e){
        const { name, value } = e.target;
        if(name === "price"){
            setForm({...form, [name] :parseFloat(value)});
        }else if (name === "imgLoc"){
            const reader = new FileReader();
            reader.onload = (e) => {
                setForm({...form, [name] : btoa(e.target.result)});
            };
            if(e.target.files !== null){
                reader.readAsBinaryString(e.target.files[0]);
                setUploadFileName(e.target.files[0].name);
            }
        }else{
            setForm({...form, [name] :value});
        }
    }
    

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
            navigate("/Management");
        }catch (error){
            setLoading(false);
            setErrorMessage(ErrorMessage.contactSupport);
        }
    }


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
                <Button sx={{margin:"10px"}} variant="contained" size="small" component="label" startIcon={<PhotoCamera />}>
                    Upload
                    <input hidden accept="image/*" name="imgLoc" onChange={handleChange} type="file" />
                </Button>
                <span> {uploadFileName}</span>
                <br/>
                <LoadingButton loading={loading} type="submit" variant="contained" size="small" sx={{margin:"10px"}}>Save</LoadingButton>
                <span style={{color:"red",fontSize:"8pt"}}>{errorMessage}</span> 
            </form>
            </Paper>
        </Container>
    );
}

export {EditProduct};