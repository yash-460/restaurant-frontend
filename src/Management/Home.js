import { Button, Dialog, DialogTitle, Icon, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { Auth } from "../util/auth";
import { Path } from "../util/Constants";
import { ErrorMessage } from "../util/errorMessage";
import {RectangularCard, RestaurantHeader} from "../util/UIComponent";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";

function RestaurantHome(){

    const [store,setStore] = useState({});
    const [failed, setFailed] = useState(false);
    
    useEffect(() =>{getStore()},[]);

    async function getStore(){
        let storeId;
        if(Auth.getJWT()){
            storeId = JSON.parse(atob(Auth.getJWT().split(".")[1])).Store;
        }else{
            setFailed(true);
            console.log("token not found");
            return;
        }
        try{
            let response = await axios.get(Path.storeService + "/Store/" + storeId,{
                headers:{
                    'Authorization': `Bearer ${Auth.getJWT()}`
                } 
            });
            setStore(response.data);
        } catch (error){
            console.log(error);
            setFailed(true);
        }
    }

    function displayProduct(p){
        let body = <span style={{wordBreak:"break-word"}}>{p.description} <br/><i><b>${p.price}</b></i> </span>;
        return (
            <RectangularCard key={p.productId} header={p.productName} body={body} sx={{marginTop:"5px"}}>
                <Link style={{textDecoration:"none"}} to={"product"} state={p}><IconButton ><EditIcon/></IconButton></Link>
            </RectangularCard>
        );        
    }

    function displayError(){
        return(
            <h2>
                {ErrorMessage.contactSupport}
            </h2>
        );
    }

    function dispalyRestaurant(){
        return(
            <Container style={{marginTop:"20px"}}>
                <RestaurantHeader header={<div style={{display:"flex",justifyContent: "center"}}>{store.name}</div>} image={store.imgLoc}>
                    <div style={{display:"flex",justifyContent:"space-evenly"}}>
                        <Link style={{textDecoration:"none"}} to={"Edit"} state={store}><Button variant="outlined">Edit</Button></Link>
                        <Link style={{textDecoration:"none"}} to={"Report"}><Button variant="outlined">Report</Button></Link>
                        <Link style={{textDecoration:"none"}} to={"Add"}><Button variant="outlined">Add Product</Button></Link>
                    </div>
                </RestaurantHeader>
                {store.products?.$values.map((p) =>  displayProduct(p))}
            </Container>
        );
    }

    return(
        <div>
            {failed ? displayError() : dispalyRestaurant()}
        </div>
    );
    
}
export default RestaurantHome;