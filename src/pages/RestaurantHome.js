import { Container } from "@mui/system";
import img from "../img/img.png";
import { Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Path } from "./Constants";


function RestaurantHeader(){
    return (
        <Card sx={{width:"80%",maxWidth:"1000px",margin:"auto"}}>
            <CardActionArea>
                <CardMedia component="img" height="170" image={img}/>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        My Shop TODO Do dO
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Address dodo do do<br/> address
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}



function RestaurantHome(props){
    let params = useParams();
    const [store,setStore] = useState({});

    useEffect(getStore,[]);

    function getStore(){
        fetch(Path.baseURL + `/Store/${params.storeId}`)
       .then((response) => {
            if(!response.ok){
                throw Error(response.statusText);
            }
            return response.json();
       }).then((data )=> {setStore(data);console.log(data)})
       .catch((error) => console.log(error));
    }
    
    return (
        <Container sx={{border:"2px solid red",marginTop:"50px"}}>
            <RestaurantHeader />
            {}
        </Container>
    );
}

export default RestaurantHome;