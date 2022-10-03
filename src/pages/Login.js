import { Button, Paper, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import { useState } from "react";


function Login(){
    const [form,setForm] = useState({id:"",password:""});
    function setId(value){
        setForm(form => ({...form,
            id:value
        }));
    }
    function setPassword(value){
        setForm(form => ({...form,
            password:value
        }));
    }
    function submit(){
        alert(JSON.stringify(form));
        
    }
    return (
        <Container fixed >
            <Paper elevation={2} style={{margin:"auto",marginTop:"50px",textAlign:"center",padding:"10px 50px", width:"max-content"}}>
                <h2>Login</h2>
                <TextField required label="User ID" size="small" margin="dense" inputProps={{size:"40"}} value={form.id} onChange={(e) =>setId(e.target.value)}/>
                <br/>
                <TextField required label="Password" size="small"  margin="dense" inputProps={{size:"40"}} type="password" value={form.password} onChange={(e)=> setPassword(e.target.value)}/>
                <br/>
                <Button variant="contained" size="small" sx={{marginTop:"10px"}} onClick={() => submit()}>Log in</Button>
                <br/>
                <Button variant="contained" size="small" sx={{margin:"10px"}}>Sign up</Button>
            </Paper>
        </Container>
    );
};

function Signin(){
    return (
        <Container fixed >
            <Paper elevation={2} style={{margin:"auto",marginTop:"50px",textAlign:"center",padding:"10px 50px", width:"max-content"}}>
                <h2>Create Account</h2>
                
                <TextField required label="User Name" size="small" margin="dense" inputProps={{size:"40"}}/>
                <br/>
                <TextField required label="Password" size="small"  margin="dense" inputProps={{size:"40"}} type="password"/>
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

