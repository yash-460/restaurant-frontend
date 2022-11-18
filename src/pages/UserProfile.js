import { LoadingButton } from "@mui/lab";
import { Box, Button, Paper, Skeleton, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import axios from "axios";
import { useEffect, useState } from "react";
import { Auth } from "../util/auth";
import { Path } from "../util/Constants";
import { ErrorMessage } from "../util/errorMessage";

function UserProfile(){

    const [failed,setFailed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form,setForm] = useState({});
    const [editMode,setEditMode] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const [saveBtnLoading,setSaveBtnLoading] = useState(false);
    const [displaySuccess,setDisplaySuccess] = useState(false);
    const [displayPwdSuccess,setDisplayPwdSuccess] = useState(false);
    const [pwdErrorMessage,setPwdErrorMessage] = useState("");
    const [passwordForm,setPasswordForm] = useState({password: "", confirmPassword:""});
    const [pwdBtnLoading,setPwdBtnLoading] = useState(false);
    
    useEffect(()=>{
        fetchProfile();
    },[]);

    async function fetchProfile(){
        let name = null;
        if(Auth.getJWT()){
            name = JSON.parse(atob(Auth.getJWT().split(".")[1])).name;
        }else{
            setFailed(true);
            console.log("token not found");
            return;
        }
        try{
            let response = await axios.get(Path.userManagementService + "/User/"+ name);
            setForm(response.data);
        }catch(error){
            setFailed(true);
        }   
        setLoading(false);
    }

    async function submitForm(e){
        e.preventDefault();
        setDisplaySuccess(false);
        try{
            setSaveBtnLoading(true);
            setErrorMessage("");
            let response = await axios.put(
                Path.userManagementService + "/User/" + form.userName,
                form,{
                    headers:{
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
                });
                setEditMode(false);
                setDisplaySuccess(true);
        }catch(error){
            console.log(error);
            setErrorMessage("Error updating the profile");
        }
        setSaveBtnLoading(false);
    }

    function showSkeleton(){
        return(
            <div style={{width:"400px"}}>
                <Skeleton sx={{width:"80%"}}/>
                <Skeleton sx={{width:"70%"}}/>
                <Skeleton sx={{width:"50%"}}/>
                <br/><br/>
                <Skeleton sx={{width:"80%"}}/>
                <Skeleton sx={{width:"70%"}}/>
                <Skeleton sx={{width:"50%"}}/>
                <br/><br/>
            </div>
        );
    }

    async function updatePassword(e){
        e.preventDefault();
        setDisplayPwdSuccess(false);
        setPwdErrorMessage("");     
        if(passwordForm.password !== passwordForm.confirmPassword){
            setPwdErrorMessage("Password Doesn't match");
            return;
        }
        setPwdBtnLoading(true);
        try{
            let response = await axios.post(
                Path.userManagementService + "/User/password",
                {password: passwordForm.password},{
                    headers:{
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
            });
            setDisplayPwdSuccess(true);
            setPasswordForm({password: "", confirmPassword:""});
        }catch(error){
            console.log(error);
            setPwdErrorMessage(ErrorMessage.contactSupport);
        }
        setPwdBtnLoading(false);
    }

    function changeMode(){
        setEditMode(true);
        setDisplaySuccess(false);
    }

    function handleChange(e){
        const { name, value } = e.target;
        setForm({...form, [name] :value});
    }

    function handlePwdChange(e){
        const { name, value } = e.target;
        setPasswordForm({...passwordForm, [name] :value});
    }

    return (
        <div>
            {failed ? <h1 style={{textAlign:"center"}}>{ErrorMessage.contactSupport}</h1> : (
                <Container fixed >
                <Paper elevation={2} style={{margin:"auto",marginTop:"50px",textAlign:"center",padding:"10px 50px", width:"max-content"}}>
                    <h2>User Profile</h2>
                    {loading ? showSkeleton() : (<div>
                        <form onSubmit={submitForm} style={{textAlign:"left"}}>
                        <TextField label="First Name"  name="firstName" value={form.firstName} onChange={handleChange} size="small" margin="dense" inputProps={{size:"40",readOnly:!editMode}}/>
                        <br/>
                        <TextField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} size="small" margin="dense" inputProps={{size:"40",readOnly:!editMode}}/>
                        <br/>
                        <TextField required label="email" name="email" value={form.email} onChange={handleChange} size="small" margin="dense" inputProps={{size:"40",readOnly:!editMode}} type="email"/>
                        <br/>
                        <TextField label="Phone Number" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} size="small" margin="dense" inputProps={{size:"40",max:9999999999,readOnly:!editMode}} type="number"/>
                        <br/>
                        <span style={{color:"red",fontSize:"10pt"}}>{errorMessage}</span>
                        <span style={{color:"green",fontSize:"10pt",display:displaySuccess ? "inline-block" : "none"}}>Saved Successfully!</span> 
                        <div style={{textAlign:"left"}}>
                            <Button variant="contained" size="small" onClick={changeMode} disabled={editMode} sx={{margin:"10px"}} >Edit</Button>
                            <LoadingButton loading={saveBtnLoading} variant="contained" type="submit" disabled={!editMode} size="small" sx={{margin:"10px"}}>Save</LoadingButton>                    
                        </div>
                        </form>
                        <br/>
                        <Paper elevation={2} style={{margin:"auto",textAlign:"left",padding:"10px 50px", width:"max-content"}}>
                            <h3>Reset Password</h3>
                            <form onSubmit={updatePassword}>
                            <TextField required label="New Password" name="password" onChange={handlePwdChange} value={passwordForm.password} size="small"  margin="dense" inputProps={{size:"30",minLength:"8"}} type="password"/>
                            <br/>
                            <TextField required label="Confirm Password" name="confirmPassword" onChange={handlePwdChange} value={passwordForm.confirmPassword} size="small"  margin="dense" inputProps={{size:"30",minLength:"8"}} type="password"/>
                            <br/>
                            <span style={{color:"red",fontSize:"10pt"}}>{pwdErrorMessage}</span>
                            <span style={{color:"green",fontSize:"10pt",display:displayPwdSuccess ? "inline-block" : "none"}}>Updated Successfully!</span> 
                            <div style={{textAlign:"left"}}>
                                <LoadingButton loading={pwdBtnLoading} variant="contained" type="submit" size="small" sx={{margin:"10px"}}>Update</LoadingButton>
                            </div>
                            </form>
                        </Paper>
                    </div>)}
                </Paper>
                </Container>
            )}
        </div>
        
    );
}

export {UserProfile};