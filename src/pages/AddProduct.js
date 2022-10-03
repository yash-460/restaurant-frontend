import { Button, Paper, TextField } from "@mui/material";
import { Container } from "@mui/system";

function AddProduct(){
    return (
        <Container fixed >
            <Paper elevation={2} style={{margin:"auto",marginTop:"50px",textAlign:"center",padding:"10px 50px", width:"max-content"}}>               
            <h2>Add Product</h2>
            <TextField required label="Name" size="small" margin="dense" inputProps={{size:"40"}}/>
            <br/>
            <TextField label="Description" size="small" margin="dense" inputProps={{size:"40"}}/>
            <br/>
            <TextField required label="Price" size="small" margin="dense" inputProps={{size:"10"}}/>
            &nbsp;&nbsp;
            <Button variant="contained" size="small" component="label">
                Upload
                <input hidden accept="image/*" multiple type="file" />
            </Button>
            <br/>
            <Button variant="contained" size="small" sx={{margin:"10px"}}>Add</Button>
            </Paper>
        </Container>
    );
}

export {AddProduct};