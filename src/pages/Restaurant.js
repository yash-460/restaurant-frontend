import { Container } from "@mui/system";
import img from "../img/img.png";
import { Card, CardActionArea, CardContent, CardMedia, Checkbox, IconButton, Paper, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Path } from "../util/Constants";
import axios from "axios";
import { RectangularCard, RestaurantHeader } from "../util/UIComponent";
import { ErrorMessage } from "../util/errorMessage";
import { CartDialog } from "../util/CartDialog";
import {  FavoriteBorder,Favorite } from "@mui/icons-material";
import { pink } from '@mui/material/colors';
import { Auth } from "../util/auth";
import { LoadingButton } from "@mui/lab";
import { CustomFavourite } from "../util/CustomFavourite";
import StarIcon from '@mui/icons-material/Star';



function Restaurant(props){
    let params = useParams();
    const [store,setStore] = useState({});
    const [failed, setFailed] = useState(false);
    const [isCartOpen, setCartOpen] = useState(false);
    const [cartProduct,setCartProduct] = useState({});
    const [favourite,setFavourite] = useState([]);

    useEffect(() => {getStore()},[]);

    async function getStore(){
        try{
            let response = await  axios.get(Path.storeService + `/Store/${params.storeId}?active=true`);
            setStore(response.data);

            // Favourite fetching
            if(Auth.getJWT()){
                try{
                    let favouriteResponse = await axios.get(
                        Path.storeService + `/favourite/${params.storeId}`,{
                            headers:{
                                'Authorization': `Bearer ${Auth.getJWT()}`
                            }
                        });
                    setFavourite(favouriteResponse.data.$values);
                }catch(error){
                    console.log("error fetching favourites");
                }
            }
        }catch(error){
            console.log(error);
            setFailed(true);
        }
    }

    function handleClose(){
        setCartOpen(false);
    }

    function openCart(product){
        setCartProduct(product);
        setCartOpen(true);
    }

    function removeFavourtie(productId){
        setFavourite(favourite.filter(p  => p != productId));
    }

    function addFavourite(productId){
        setFavourite([...favourite,productId]);
    }

    function displayProduct(p){
        let body = <span style={{wordBreak:"break-word"}}>{p.description} <br/><i><b>${p.price}</b></i> </span>;
        return (
            <RectangularCard key={p.productId} header={p.productName} body={body} onClick={(e)=>{openCart(p)}}>
                {p.rating} <span>&nbsp;</span><StarIcon sx={{verticalAlign:"middle",color:"#faaf00"}}/>
                {Auth.getJWT() ? <CustomFavourite productId={p.productId} isFavourite={favourite.includes(p.productId)} removeFavourite={removeFavourtie} addFavourite={addFavourite} /> : ""}
            </RectangularCard>
        );        
    }

    function dispalyRestaurant(){
        return(
            <Container style={{marginTop:"20px"}}>
                <RestaurantHeader header={store.name} image={store.imgLoc}>
                    <Typography variant="body2" color="text.secondary">
                        {store.streetName} <br />
                        {store.city + " " + store.province + " " + store.zip}
                    </Typography>
                </RestaurantHeader>
                {store.products?.$values.map((p) =>  displayProduct(p))}
            </Container>
        );
    }
   

    return (
        <div>
            {failed ? <h2>{ErrorMessage.contactSupport}</h2> : dispalyRestaurant()}
            <CartDialog  product={cartProduct} open={isCartOpen} handleClose={handleClose}/>
        </div>
    );
    
}

export default Restaurant;