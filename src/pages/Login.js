import { LineAxisOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Paper, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import axios from "axios";
import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Path } from "../util/Constants";
import {ErrorMessage} from "../util/errorMessage";

/**
 * Login page
 * @param {*} props 
 * @returns 
 */
function Login(props){
    const [form,setForm] = useState({userName:"",password:""});
    const [loading,setLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    function handleChange(e){
        const { name, value } = e.target; 
        setForm({...form, [name] :value});
    }

    async function SubmitForm(e){
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        let response;
        try{
            response  = await axios.post(
                Path.authService + "/authenticate", 
                JSON.stringify(form),{
                headers:{
                "Content-type": "application/json; charset=UTF-8"
            }});
        } catch(error){
            if(error.response.status === 401){
                setErrorMessage(ErrorMessage.credentialInvalid);
            }else {
                setErrorMessage(ErrorMessage.contactSupport);
            }
            setLoading(false);
        }
        if(response != null &&  response.status === 200){
            sessionStorage.setItem('jwtToken', response.data.token);
            navigate("/" + location.search.slice(1));
        }                                  
    }

    // Render login page
    return (
        <Container fixed >
            <Paper elevation={2} style={{margin:"auto",marginTop:"50px",textAlign:"center",padding:"10px 50px", width:"max-content"}}>
                <h2>Login</h2>
                <form onSubmit={SubmitForm}>
                    <TextField required label="User ID" name="userName" size="small" margin="dense" inputProps={{size:"40"}} value={form.userName} onChange={handleChange}/>
                    <br/>
                    <TextField required label="Password" name="password" size="small"  margin="dense" inputProps={{size:"40",minLength:8}} type="password" value={form.password} onChange={handleChange}/>
                    <br/>
                    <span style={{color:"red",fontSize:"10pt"}}>{errorMessage}</span> 
                    <br/>
                    <LoadingButton loading={loading} variant="contained" size="small" sx={{marginTop:"10px"}}  type="submit" >Log in</LoadingButton>               
                    <br/>
                    <Button variant="contained" size="small" sx={{margin:"10px"}}><Link to="../SignUp" style={{textDecoration: 'none'}}>Sign up</Link></Button>
                </form>
            </Paper>
        </Container>
    );
};

/**
 * Sign Up page
 * @returns 
 */
function Signin(){

    const [form,setForm] = useState({userName:"",password:"",firstName:"",lastName:"",email:"",phoneNumber: 0});
    const [errorMessage,setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);

    function handleChange(e){
        const { name, value } = e.target;
        if(name == "phoneNumber"){
            setForm({...form,[name]: parseInt(value)});
        }else{
            setForm({...form, [name] :value});
        }
    }

    async function submitForm(e){
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);
        try{
            let response = await axios.post(
                Path.userManagementService + "/User",
                form
            );
            navigate("/");
        }catch(error){
            console.log(error);
            setLoading(false);
            if(error.response.data){
                if(error.response.data.status === 409){
                    setErrorMessage("User name already exist");
                }else{
                    setErrorMessage(ErrorMessage.contactSupport);
                }
            }else{
                setErrorMessage(ErrorMessage.contactSupport);
            }
        }
    }

    return (
        <Container fixed >
            <Paper elevation={2} style={{margin:"auto",marginTop:"50px",padding:"10px 50px", width:"max-content"}}>
                <h2 style={{textAlign:"center"}}>Create Account</h2>
                <form onSubmit={submitForm}>
                    <TextField required label="User Name" name="userName" value={form.userName} onChange={handleChange} size="small" margin="dense" inputProps={{size:"40"}}/>
                    <br/>
                    <TextField required label="Password" name="password" value={form.password} onChange={handleChange} size="small"  margin="dense" inputProps={{size:"40",minLength:8}} type="password"/>
                    <br/>
                    <TextField label="First Name" size="small" name="firstName" margin="dense" value={form.firstName} onChange={handleChange} inputProps={{size:"40",maxLength:40}}/>
                    <br/>
                    <TextField label="Last Name" size="small" name="lastName" margin="dense" value={form.lastName} onChange={handleChange} inputProps={{size:"40",maxLength:40}}/>
                    <br/>
                    <TextField required label="email" size="small" name="email" margin="dense" value={form.email} onChange={handleChange} inputProps={{size:"40",maxLength:40}} type="email"/>
                    <br/>
                    <TextField label="Phone Number" size="small" name="phoneNumber" margin="dense" value={form.phoneNumber ? form.phoneNumber : ""} onChange={handleChange} inputProps={{size:"40",max:9999999999,type:"number"}}/>
                    <br/>
                    <span style={{color:"red",fontSize:"10pt"}}>{errorMessage}</span> 
                    <br/>
                    <LoadingButton loading={loading}  variant="contained" size="small" sx={{margin:"auto",marginTop:"10px",display:"block"}} type="submit">Sign up</LoadingButton>
                </form>
            </Paper>
        </Container>
    );
}


export {Login, Signin};

