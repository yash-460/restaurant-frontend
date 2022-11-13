import { PhotoCamera } from "@mui/icons-material";
import { Button, getImageListItemBarUtilityClass, Paper, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import LoadingButton from '@mui/lab/LoadingButton';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../util/auth";
import { Path } from "../util/Constants";
import { ErrorMessage } from "../util/errorMessage";

function RegisterRestaurant(){

    const [form,setForm] = useState({name:"",registrationNumber:0, streetName:"",city:"",province:"",zip:"",imgLoc:""});
    const [loading,setLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [uploadFileName,setUploadFileName] = useState();


    async function submitForm(e){
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);
        try{           
            let response = await axios.post(
                Path.storeService + "/Store",
                form,{
                    headers:{
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
            });
            response  = await axios.post(
                Path.authService + "/authenticate/RefreshToken",{
                headers:{
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }});
            sessionStorage.setItem('jwtToken', response.data.token);
            navigate("/Management");
        }catch (error){
            console.log(error);
            setLoading(false);
            setErrorMessage(ErrorMessage.contactSupport);
        }

    }

    function handleChange(e){
        const { name, value } = e.target;
        if(name === "imgLoc"){
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

    return (
        <Container fixed >
            <Paper elevation={2} style={{margin:"auto",marginTop:"50px",padding:"10px 50px", width:"max-content"}}>
                <h2 style={{textAlign:"center"}}>Register Restaurant</h2>
                <form onSubmit={submitForm}>
                    <TextField value={form.name} name="name" onChange={handleChange} required label="Shop Name" size="small" margin="dense" inputProps={{size:"40"}}/>
                    <br/>
                    <TextField value={form.registrationNumber} name="registrationNumber" onChange={handleChange} required label="Registration Number" size="small" type="number" margin="dense" inputProps={{size:"20",maxLength:9}}/>
                    <br/>
                    <TextField value={form.streetName} name="streetName" onChange={handleChange} label="Street Name" size="small" margin="dense" inputProps={{size:"16"}}/>
                    &nbsp;&nbsp;
                    <TextField value={form.city} name="city" onChange={handleChange} label="City" size="small" margin="dense" inputProps={{size:"15"}}/>                
                    <br/>
                    <TextField value={form.province} name="province" onChange={handleChange} label="Province" size="small" margin="dense" inputProps={{size:"16"}}/>
                    &nbsp;&nbsp;    
                    <TextField value={form.zip} name="zip" onChange={handleChange} label="Zip code" size="small" margin="dense" inputProps={{size:"15"}}/>                
                    <br/>
                    <Button variant="contained" size="small" component="label" sx={{marginTop:"10px"}} startIcon={<PhotoCamera/>}>
                        Upload
                        <input hidden accept="image/*" multiple type="file" name="imgLoc" onChange={handleChange}/>
                    </Button>
                    <span> {uploadFileName}</span>
                    <br/>
                    <LoadingButton loading={loading}  variant="contained" size="small" type="submit" sx={{marginTop:"10px"}} >Register</LoadingButton>
                    <span style={{color:"red",fontSize:"8pt"}}>{errorMessage}</span> 
                </form>
            </Paper>
        </Container>
    );
}

export {RegisterRestaurant};
