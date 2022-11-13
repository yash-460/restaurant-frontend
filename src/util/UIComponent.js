import { Button, ButtonBase, Card, CardActionArea, CardActions, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import img from "../img/img.png";


export function RectangularCard(props){
    return (<Container sx={{margin:"25px"}}>
            <Paper elevation={3} sx={{display:"flex",backgroundColor:"rgb(251 251 251)",padding:"5px",margin:"auto",maxWidth:"fit-content",borderRadius:"10px 10px 0 0"}}>
                <b>{props.topText}</b>
            </Paper>
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
