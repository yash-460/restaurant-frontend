import { PhotoCamera } from "@mui/icons-material";
import { Alert, Button, ButtonBase, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Paper, Snackbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import img from "../img/img.png";


export function RectangularCard(props){
    return (<Container sx={{margin:"auto",marginTop:"40px"}}>
            <Paper sx={{display:"flex",backgroundColor:"rgb(251 251 251)",margin:"auto",padding:"15px",maxWidth:"700px",borderRadius:"10px"}}>              
                <div style={{display:"inline-block",width:"100%",cursor:props.onClick ? "pointer" : "default"}} onClick={props.onClick}>
                    <b>{props.header}</b><br/>
                    {props.body}
                </div>
                <div style={{alignSelf:"center",marginLeft:"auto",padding:"0 5px 0 10px",display:"flex"}}>
                    {props.children}
                </div>                
            </Paper>
    </Container>);
}

export function RestaurantHeader(props){
    return (
        <Card sx={{width:"80%",maxWidth:"1000px",margin:"auto"}}>
            <CardMedia component="img" height="250" image={props.image ? ("data:image/*;base64, " + props.image) : img}/>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {props.header}
                </Typography>
                <div>
                    {props.children}
                </div>
            </CardContent>
        </Card>
    );
}


export function UploadButton(props){
    const [fileName,setFileName] = useState("");

    function handleChange(e){
        const reader = new FileReader();
            reader.onload = (e) => {
                props.handleUpload(btoa(e.target.result));
        };
        if(e.target.files !== null){
            reader.readAsBinaryString(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    }

    function removeFile(){
        setFileName("");
        props.removeUpload();
    }

    return(
        <div>
            <Button sx={{margin:"10px"}} variant="contained" size="small" component="label" startIcon={<PhotoCamera />}>
                Upload
                <input hidden accept="image/*" name="imgLoc" onChange={handleChange} type="file" />
            </Button>
            { fileName.length ? <Chip  label={fileName} variant="outlined" color="primary" onDelete={removeFile} /> : ""}
        </div>
    );
}

export default function SuccessSnackbars(props) {
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      props.close();
    };
  
    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {props.message}
          </Alert>
        </Snackbar>
    );
  }