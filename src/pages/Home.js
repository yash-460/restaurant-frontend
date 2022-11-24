import { Button, Card, CardActionArea, CardContent, CardMedia, InputBase, Pagination, Paper, Skeleton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { memo, useEffect, useState } from "react";
import { Path } from "../util/Constants";
import img from "../img/img.png";
import StarIcon from '@mui/icons-material/Star';
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import StoreCard, { CustomPagination, SearchBar } from "../util/UIComponent";
import SearchIcon from '@mui/icons-material/Search';

const cardOverrideStyle = {
    width: 300,
    display:"inline-block",
    margin:"30px"
}

/**
 * home of the application listing all the restaurant 
 * @returns 
 */
function Home(){
    
    const [stores, setStores] = useState([]);
    const [failed, setFailed] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();
    const [searchField,setSearchField] = useState("");
    
    useEffect(() => {getData()},[]);

    async function getData(page,searchTxt){
        if(searchTxt != null)setLoading(true);
        try{
            let response = await axios.get(`${Path.storeService}/Store?search=${searchTxt == null ? searchField : searchTxt}&pageSize=6&pageIndex=${page ? page : 1}`);
            console.log(response);
            setTotalPage(response.data?.totalPages);
            setStores(response.data?.items.$values);
        }catch (error){
            setFailed(true);
        }
        setLoading(false);
    }

    function goToStoreDetail(id){
        navigate(`/Store/${id}`);
    }
    
    function displayStore(data){
        let image = img
        if(data.imgLoc !== null && data.imgLoc.length != 0){
            image = "data:image/*;base64, "+ data.imgLoc;
        }
        console.log("called");
        return (
        <Card key={data.storeId} sx={cardOverrideStyle} onClick={() => goToStoreDetail(data.storeId)}>
            <CardActionArea>
                <CardMedia component="img" height="170" image={image}/>
                <CardContent>
                    <Typography variant="h6" component="div">
                        {data.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {data.rating} <StarIcon sx={{verticalAlign:"middle",color:"#faaf00"}}/>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>);
    }

    function displaySkeleton(i){      
        return(
            <div style={cardOverrideStyle} key={i}>
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

    function search(txt){
        setSearchField(txt);
        getData(1,txt);
    }

    return (
       <Container sx={{ marginTop:"30px"}}>
            <SearchBar search={search}/>
          {failed ? showError() : (loading ?  Array(6).fill(null).map((u,i)=> displaySkeleton(i)) : (stores.length ? (
            <CustomPagination TotalPage={totalPage} fetchData={getData}>
                {stores.map((store) => displayStore(store))}
            </CustomPagination>) : <h2 style={{textAlign:"center"}}>No Store found..</h2>))}
          <br/><br/><br/><br/>
       </Container>
    );  
};

export default Home;