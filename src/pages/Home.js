import { Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Path } from "../util/Constants";
import img from "../img/img.png";
import StarIcon from '@mui/icons-material/Star';
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";

const cardOverrideStyle = {
    width: 300,
    display:"inline-block",
    margin:"30px"
}

function Home(){
    
    const [stores, setStores] = useState([]);
    const [failed, setFailed] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {getData()},[]);

    async function getData(){
        try{
            let response = await axios.get(Path.storeService + '/Store');
            if(response.data?.$values.length != 0)       
                setStores(response.data?.$values);
            else setFailed(true);
        }catch (error){
            setFailed(true);
        }
    }

    function goToStoreDetail(id){
        navigate(`/Store/${id}`);
    }
    function displayStore(data){
        let image = img
        if(data.imgLoc !== null && data.imgLoc.length != 0){
            image = "data:image/*;base64, "+ data.imgLoc;
        }
        return (
        <Card key={data.storeId} sx={cardOverrideStyle} onClick={() => goToStoreDetail(data.storeId)}>
            <CardActionArea>
                <CardMedia component="img" height="170" image={image}/>
                <CardContent>
                    <Typography variant="h6" component="div">
                        {data.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {data.rating} <StarIcon sx={{verticalAlign:"middle"}}/>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>);
    }

    function displaySkeleton(){      
        return(
            <div style={cardOverrideStyle}>
                <Skeleton variant="rectangular" width={210} height={118}/>
                <Skeleton width={210}/>
                <Skeleton width="60%"/>
            </div>
        );
    }

    function showError(){
        return(
            <h2>Something Went Wrong!! Contact Support</h2>
        );
    }

    return (
       <Container sx={{ marginTop:"30px"}}>
          {failed ? showError() : (stores.length === 0 ?  displaySkeleton() : stores.map((store) => displayStore(store)))}
       </Container>
    );
};

export default Home;