import { PhotoCamera } from "@mui/icons-material";
import { Button, getImageListItemBarUtilityClass, Paper, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import LoadingButton from '@mui/lab/LoadingButton';
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Auth } from "../util/auth";
import { Path } from "../util/Constants";
import { ErrorMessage } from "../util/errorMessage";
import { UploadButton } from "../util/UIComponent";

/**
 * this component contains functionality to edit restaurant details
 * only restaurant owners have access
 * @returns 
 */
function EditRestaurant(){

    // Inital state
    const location = useLocation();
    const [form,setForm] = useState({
        storeId: location.state.storeId,
        name:location.state.name,
        registrationNumber:location.state.registrationNumber,
        streetName:location.state.streetName,
        city:location.state.city,
        province:location.state.province,
        zip:location.state.zip,
        imgLoc:location.state.imgLoc
    });
    const [loading,setLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const navigate = useNavigate();
    
    // submits put to edit the restaurnat details
    async function submitForm(e){
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);
        try{           
            let response = await axios.put(
                Path.storeService + "/Store/" + form.storeId,
                form,{
                    headers:{
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
            });
            navigate("/Management");  // on success
        }catch (error){
            console.log(error);
            setLoading(false);
            setErrorMessage(ErrorMessage.contactSupport);
        }

    }

    // handle form changes to maintain react state
    function handleChange(e){
        const { name, value } = e.target;
        setForm({...form, [name] :value});
    }

    // UI to edit the restaturant
    return (
        <Container fixed >
            <Paper elevation={2} style={{margin:"auto",marginTop:"50px",padding:"10px 50px", width:"max-content"}}>
                <h2 style={{textAlign:"center"}}>Edit</h2>
                <form onSubmit={submitForm}>
                    <TextField value={form.name} name="name" onChange={handleChange} required label="Shop Name" size="small" margin="dense" inputProps={{size:"40"}}/>
                    <br/>
                    <TextField value={form.registrationNumber} name="registrationNumber" onChange={handleChange} required label="Registration Number" size="small" margin="dense" inputProps={{size:"20",maxLength:9}}/>
                    <br/>
                    <TextField value={form.streetName} name="streetName" onChange={handleChange} label="Street Name" size="small" margin="dense" inputProps={{size:"16"}}/>
                    &nbsp;&nbsp;
                    <TextField value={form.city} name="city" onChange={handleChange} label="City" size="small" margin="dense" inputProps={{size:"15"}}/>                
                    <br/>
                    <TextField value={form.province} name="province" onChange={handleChange} label="Province" size="small" margin="dense" inputProps={{size:"16"}}/>
                    &nbsp;&nbsp;    
                    <TextField value={form.zip} name="zip" onChange={handleChange} label="Zip code" size="small" margin="dense" inputProps={{size:"15"}}/>                
                    <br/>
                    <UploadButton handleUpload={(content)=> setForm({...form,imgLoc:content})} removeUpload={()=>setForm({...form,imgLoc:""})}/>
                    <br/>
                    <LoadingButton loading={loading} type="submit" variant="contained" size="small" sx={{marginTop:"10px"}} >Save</LoadingButton>
                    <span style={{color:"red",fontSize:"8pt"}}>{errorMessage}</span> 
                </form>
            </Paper>
        </Container>
    );
}

export {EditRestaurant};
