import axios from "axios";
import { useEffect, useState } from "react";
import { Path } from "../util/Constants";
import { ErrorMessage } from "../util/errorMessage";
import { Auth } from "../util/auth";
import { display } from "@mui/system";
import { RectangularCard } from "../util/UIComponent";
import { CustomFavourite } from "../util/CustomFavourite";
import {  CartDialog } from "../util/CartDialog";
import { Container, Paper, Skeleton } from "@mui/material";
import { CustomPagination } from "../util/UIComponent";


// Favourite product of the users
export function FavouritePage(){

    const[favourite,setFavourite] = useState([]);
    const [loading,setLoading] = useState(true);
    const [failed,setFailed] = useState(false);
    const [cartProduct,setCartProduct] = useState({});
    const [isCartOpen, setCartOpen] = useState(false);
    const [totalPage,setTotalPage] = useState(0);

    useEffect(()=>{featchFavourite()},[]);

    async function featchFavourite(page){
        try{
            let response = await axios.get(Path.storeService + "/favourite/product?pageSize=5&pageIndex=" + (page ? page : 1),{
                headers:{
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            });
            console.log(response);
            setTotalPage(response.data?.totalPages);
            setFavourite(response.data?.items.$values);
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
                    favourite.length ? <CustomPagination TotalPage={totalPage} fetchData={featchFavourite}>{favourite.map(fav => displayProduct(fav.product))} <br/><br/></CustomPagination> : (
                    <h2 style={{textAlign:"center"}}>You don't have any favourite. Visit any restaurant and choose one</h2>
                    ))}
                    <br/><br/>
                </Container>
            )}
            <CartDialog  product={cartProduct} open={isCartOpen} handleClose={handleClose}/>
        </div>
    );
}