import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { pink } from '@mui/material/colors';
import axios from "axios";
import { useState } from "react";
import { Auth } from "../util/auth";
import { Path } from "../util/Constants";

export function CustomFavourite(props){

    const [disable,setDisable] = useState(false);

    let favouriteStyle= {
        color: pink[800],
        '&.Mui-checked': {
          color: pink[600],
        }};

    async function handleFavourite(productId){
        setDisable(true); // disabling to avoid double press
        if(props.isFavourite){  // Remove from favourite
            try{  
                let response = await axios.delete(
                    Path.storeService + `/favourite/remove/${productId}`,{
                        headers:{
                            'Authorization': `Bearer ${Auth.getJWT()}`
                        }
                    });
                props.removeFavourite(productId);
            }catch(error){
                console.log(error);
            }
        }else{   // Add to favourite
            try{
            let response = await axios.post(
                    Path.storeService + `/favourite/add/${productId}`,null,{
                    headers:{
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
                });
                props.addFavourite(productId);
            }catch(error){
                console.log(error);
            }
        }
    
        setDisable(false); //enabling back
    }   
        
    return(
        <Checkbox  disabled={disable} checked={props.isFavourite} onChange={() => handleFavourite(props.productId)} sx={favouriteStyle} icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}/>
    );
}