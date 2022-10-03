import { Button, Paper, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import { useState } from "react";
import { Path } from "./Constants";

function RegisterRestaurant(){

    const [form,setForm] = useState({name:"",registrationNumber:0, streetName:"",city:"",province:"",zip:""});
    const [btnDisabled,setBtnDisabled] = useState(false);
    function submitForm(){
        setBtnDisabled(true);
        fetch(Path.baseURL + "/Store",{
            method:"POST",
            body: JSON.stringify(form),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
        .then(json => console.log(json));
    }

    function handleChange(e){
        const { name, value } = e.target; 
        setForm({...form, [name] :value});
    }

    return (
        <Container fixed >
            <Paper elevation={2} style={{margin:"auto",marginTop:"50px",padding:"10px 50px", width:"max-content"}}>
                <h2 style={{textAlign:"center"}}>Register Shop</h2>
                
                <TextField value={form.name} name="name" onChange={handleChange} required label="Shop Name" size="small" margin="dense" inputProps={{size:"40"}}/>
                <br/>
                <TextField value={form.registrationNumber} name="registrationNumber" onChange={handleChange} required label="Registration Number" size="small" margin="dense" inputProps={{size:"20"}}/>
                <br/>
                <TextField value={form.streetName} name="streetName" onChange={handleChange} label="Street Name" size="small" margin="dense" inputProps={{size:"16"}}/>
                &nbsp;&nbsp;
                <TextField value={form.city} name="city" onChange={handleChange} label="City" size="small" margin="dense" inputProps={{size:"15"}}/>                
                <br/>
                <TextField value={form.province} name="province" onChange={handleChange} label="Province" size="small" margin="dense" inputProps={{size:"16"}}/>
                &nbsp;&nbsp;
                <TextField value={form.zip} name="zip" onChange={handleChange} label="Zip code" size="small" margin="dense" inputProps={{size:"15"}}/>                
                <br/>         
                <Button variant="contained" size="small" component="label" sx={{marginTop:"10px"}}>
                    Upload
                    <input hidden accept="image/*" multiple type="file" />
                </Button>
                <br/>
                <Button disabled={btnDisabled} variant="contained" size="small" sx={{marginTop:"10px"}} onClick={submitForm}>Register</Button>
            </Paper>
        </Container>
    );
}

export {RegisterRestaurant};
