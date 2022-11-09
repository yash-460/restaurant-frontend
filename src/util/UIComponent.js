import { Button, ButtonBase, Card, CardActionArea, CardActions, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import img from "../img/img.png";


export function RectangularCard(props){
    return (<Container sx={{margin:"25px"}}>
            <Paper sx={{display:"flex",backgroundColor:"rgb(251 251 251)",margin:"auto",padding:"15px",maxWidth:"700px",borderRadius:"10px"}}>              
                <div style={{display:"inline-block",width:"100%"}} onClick={props.onClick}>
                    <b>{props.header}</b><br/>
                    {props.body}
                </div>
                <div style={{alignSelf:"center",marginLeft:"auto",padding:"0 5px 0 10px"}}>
                    {props.children}
                </div>                
            </Paper>
    </Container>);
}

export function RestaurantHeader(props){
    return (
        <Card sx={{width:"80%",maxWidth:"1000px",margin:"auto"}}>
            <CardMedia component="img" height="170" image={props.img ? props.image : img}/>
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
