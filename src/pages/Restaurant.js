import { Container } from "@mui/system";
import img from "../img/img.png";
import { Card, CardActionArea, CardContent, CardMedia, Paper, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Path } from "../util/Constants";
import axios from "axios";
import { render } from "@testing-library/react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { RectangularCard, RestaurantHeader } from "../util/UIComponent";
import { ErrorMessage } from "../util/errorMessage";


function Restaurant(props){
    let params = useParams();
    const [store,setStore] = useState({});
    const [failed, setFailed] = useState(false);

    useEffect(() => {getStore()},[]);

    async function getStore(){

        try{
            let response = await  axios.get(Path.storeService + `/Store/${params.storeId}`);
            setStore(response.data);
            console.log(response.data);
        }catch(error){
            console.log(error);
            setFailed(true);
        }
    }
    function displayProduct(p){
        let body = <span>{p.description} <br/><i><b>${p.price}</b></i> </span>;
        return (
            <RectangularCard header={p.productName} body={body}>
                <FavoriteIcon /> Rating
            </RectangularCard>
        );        
    }

    function dispalyRestaurant(){
        return(
            <Container style={{marginTop:"20px"}}>
                <RestaurantHeader header={store.name}>
                    <Typography variant="body2" color="text.secondary">
                        {store.streetName} <br />
                        {store.city + " " + store.province + " " + store.zip}
                    </Typography>
                </RestaurantHeader>
                {store.products?.$values.map((p) =>  displayProduct(p))}
            </Container>
        );
    }

    function displayError(){
        return(
            <h2>
                {ErrorMessage.contactSupport}
            </h2>
        );
    }

    return (
        <div>
            {failed ? displayError() : dispalyRestaurant()}
        </div>
    );
    
}

export default Restaurant;