import { Button, Paper, TextField } from "@mui/material";
import Container from "@mui/material/Container";

function EditRestaurant(){
    return (
        <Container fixed >
            <Paper elevation={2} style={{margin:"auto",marginTop:"50px",textAlign:"center",padding:"10px 50px", width:"max-content"}}>
                <h2>Edit Shop</h2>
                
                <TextField required label="Shop Name" size="small" margin="dense" inputProps={{size:"40"}}/>
                <br/>
                <TextField required label="Registration Number" size="small" margin="dense" inputProps={{size:"40"}}/>
                <br/>
                <TextField label="Street Name" size="small" margin="dense" inputProps={{size:"16"}}/>
                &nbsp;&nbsp;
                <TextField label="City" size="small" margin="dense" inputProps={{size:"15"}}/>                
                <br/>
                <TextField label="Province" size="small" margin="dense" inputProps={{size:"16"}}/>
                &nbsp;&nbsp;
                <TextField label="Zip code" size="small" margin="dense" inputProps={{size:"15"}}/>                
                <br/>                                           
                <div style={{textAlign:"left"}}>            
                    <Button variant="contained" size="small" component="label">
                        Upload
                        <input hidden accept="image/*" multiple type="file" />
                    </Button>
                    <br/>
                    <Button variant="contained" size="small" sx={{margin:"10px"}}>Register</Button>
                </div>
            </Paper>
        </Container>
    );
}

export {EditRestaurant};
