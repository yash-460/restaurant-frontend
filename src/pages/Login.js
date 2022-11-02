import { LineAxisOutlined } from "@mui/icons-material";
import { Button, Paper, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import axios from "axios";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Path } from "../util/Constants";
import {ErrorMessage} from "../util/errorMessage";

function Login(props){
    const [form,setForm] = useState({userName:"",password:""});
    const [loginBtnDisabled,setLoginBtnDisabled] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const redirect = props.redirect;
    const navigate = useNavigate();

    function handleChange(e){
        const { name, value } = e.target; 
        setForm({...form, [name] :value});
    }

    async function submit(){
        setLoginBtnDisabled(true);
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
            setLoginBtnDisabled(false);
        }
        if(response != null &&  response.status === 200){
            localStorage.setItem('jwtToken', response.data.token);
            console.log(redirect);
            navigate("/");
        }                                  
    }

    return (
        <Container fixed >
            <Paper elevation={2} style={{margin:"auto",marginTop:"50px",textAlign:"center",padding:"10px 50px", width:"max-content"}}>
                <h2>Login</h2>
                <TextField required label="User ID" name="userName" size="small" margin="dense" inputProps={{size:"40"}} value={form.userName} onChange={handleChange}/>
                <br/>
                <TextField required label="Password" name="password" size="small"  margin="dense" inputProps={{size:"40"}} type="password" value={form.password} onChange={handleChange}/>
                <br/>
                <span style={{color:"red",fontSize:"8pt"}}>{errorMessage}</span> 
                <br/>
                <Button variant="contained" size="small" sx={{marginTop:"10px"}} disabled={loginBtnDisabled} onClick={submit}>Log in</Button>               
                <br/>
                <Button variant="contained" size="small" sx={{margin:"10px"}}><Link to="SignUp" style={{textDecoration: 'none'}}>Sign up</Link></Button>
            </Paper>
        </Container>
    );
};

function Signin(){

    const [form,setForm] = useState({});

    function handleChange(e){

    }
    return (
        <Container fixed >
            <Paper elevation={2} style={{margin:"auto",marginTop:"50px",textAlign:"center",padding:"10px 50px", width:"max-content"}}>
                <h2>Create Account</h2>
                
                <TextField required label="User Name" name="userName" value={form.userName} onChange={handleChange} size="small" margin="dense" inputProps={{size:"40"}}/>
                <br/>
                <TextField required label="Password" name="password" value={form.password} onChange={handleChange} size="small"  margin="dense" inputProps={{size:"40"}} type="password"/>
                <br/>
                <TextField label="First Name" size="small" margin="dense" inputProps={{size:"40"}}/>
                <br/>
                <TextField label="Last Name" size="small" margin="dense" inputProps={{size:"40"}}/>
                <br/>
                <TextField required label="email" size="small" margin="dense" inputProps={{size:"40"}} type="email"/>
                <br/>
                <TextField label="Phone Number" size="small" margin="dense" inputProps={{size:"40"}} type="tel"/>
                <br/>
                <Button variant="contained" size="small" sx={{margin:"10px"}}>Sign up</Button>
            </Paper>
        </Container>
    );
}


export {Login, Signin};

