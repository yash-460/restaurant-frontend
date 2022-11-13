import axios from "axios";
import { useEffect, useState } from "react";
import { Path } from "../util/Constants";
import { ErrorMessage } from "../util/errorMessage";
import { Auth } from "../util/auth";
import { display } from "@mui/system";
import { RectangularCard } from "../util/UIComponent";
import { CustomFavourite } from "../util/CustomFavourite";
import { AddToCart } from "../util/AddToCart";
import { Container, Paper, Skeleton } from "@mui/material";

export function FavouritePage(){

    const[favourite,setFavourite] = useState([]);
    const [loading,setLoading] = useState(true);
    const [failed,setFailed] = useState(false);
    const [cartProduct,setCartProduct] = useState({});
    const [isCartOpen, setCartOpen] = useState(false);

    useEffect(()=>{featchFavourite()},[]);

    async function featchFavourite(){
        try{
            let response = await axios.get(Path.storeService + "/favourite/product",{
                headers:{
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            });
            console.log(response);
            setFavourite(response.data.$values);
        }catch(error){
            console.log(error);
            setFailed(true);
        }
        setLoading(false);
    }

    function displayProduct(product){
        let body = <span style={{wordBreak:"break-word"}}>{product.description} <br/><i><b>${product.price}</b></i> </span>;
        return(    
            <RectangularCard key={product.productId} header={product.productName} body={body} onClick={(e)=>{openCart(product)}}>
                <CustomFavourite productId={product.productId} isFavourite={true} removeFavourite={() => setFavourite(favourite.filter(fav => fav.productId != product.productId))}/>
            </RectangularCard>
        );
    }

    function handleClose(){
        setCartOpen(false);
    }

    function openCart(product){
        setCartProduct(product);
        setCartOpen(true);
    }

    function dispalySkeleton(i){
        return(
            <Paper key={i} sx={{display:"flex",flexDirection:"column",backgroundColor:"rgb(251 251 251)",margin:"auto",padding:"15px",maxWidth:"700px",borderRadius:"10px",marginTop:"30px"}}>              
                <Skeleton sx={{width:"40%"}}/>
                <Skeleton sx={{width:"70%"}}/>
                <Skeleton sx={{width:"20%"}}/>
            </Paper>
        );
    }

    return (
        <div>
            <h1 style={{textAlign:"center"}}>Favourite</h1>
            {failed ? <h2 style={{textAlign:"center"}}>{ErrorMessage.contactSupport}</h2> : (
                <Container style={{marginTop:"30px"}}>
                    {loading ? Array(4).fill(null).map((u,i)=> dispalySkeleton(i)) : (
                    favourite.length ? favourite.map(fav => displayProduct(fav.product)) : (
                    <h2 style={{textAlign:"center"}}>You don't have any favourite. Visit any restaurant and choose one</h2>
                    ))}
                </Container>
            )}
            <AddToCart  product={cartProduct} open={isCartOpen} handleClose={handleClose}/>
        </div>
    );
}