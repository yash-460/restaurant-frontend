import { Button, Paper, TextField } from "@mui/material";
import Container from "@mui/material/Container";

function UserProfile(){
    return (
        <Container fixed >
            <Paper elevation={2} style={{margin:"auto",marginTop:"50px",textAlign:"center",padding:"10px 50px", width:"max-content"}}>
                <h2>User Profile</h2>            

                <TextField label="First Name" size="small" margin="dense" inputProps={{size:"40"}}/>
                <br/>
                <TextField label="Last Name" size="small" margin="dense" inputProps={{size:"40"}}/>
                <br/>
                <TextField required label="email" size="small" margin="dense" inputProps={{size:"40"}} type="email"/>
                <br/>
                <TextField label="Phone Number" size="small" margin="dense" inputProps={{size:"40"}} type="tel"/>
                <br/>
                <div style={{textAlign:"left"}}>
                    <Button variant="contained" size="small" sx={{margin:"10px"}}>Edit</Button>
                    <Button variant="contained" size="small" sx={{margin:"10px"}}>Save</Button>
                </div><br/>
                <Paper elevation={2} style={{margin:"auto",textAlign:"left",padding:"10px 50px", width:"max-content"}}>
                    <h3>Reset Password</h3>
                    <TextField required label="New Password" size="small"  margin="dense" inputProps={{size:"30"}} type="password"/>
                    <br/>
                    <TextField required label="Confirm Password" size="small"  margin="dense" inputProps={{size:"30"}} type="password"/>
                    <br/>
                    <div style={{textAlign:"left"}}>
                        <Button variant="contained" size="small" sx={{margin:"10px"}}>Update</Button>
                    </div>
                </Paper>

            </Paper>
        </Container>
    );
}

export {UserProfile};