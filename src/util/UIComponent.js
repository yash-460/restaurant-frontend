import { PhotoCamera } from "@mui/icons-material";
import { Alert, Button, ButtonBase, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, InputBase, Pagination, Paper, Snackbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import img from "../img/img.png";
import SearchIcon from '@mui/icons-material/Search';
import { LoadingButton } from "@mui/lab";


export function RectangularCard(props){
    return (<Container sx={{margin:"auto",marginTop:"40px"}}>
            <Paper sx={{display:"flex",backgroundColor:"rgb(251 251 251)",margin:"auto",padding:"15px",maxWidth:"700px",borderRadius:"10px"}}>              
                <div style={{display:"inline-block",width:"100%",cursor:props.onClick ? "pointer" : "default"}} onClick={props.onClick}>
                    <b>{props.header}</b><br/>
                    {props.body}
                </div>
                <div style={{alignSelf:"center",marginLeft:"auto",padding:"0 5px 0 10px",display:"flex",alignItems:"center"}}>
                    {props.children}
                </div>                
            </Paper>
    </Container>);
}

export function RestaurantHeader(props){
    return (
        <Card sx={{width:"80%",maxWidth:"1000px",margin:"auto"}}>
            <CardMedia component="img" height="250" image={props.image ? ("data:image/*;base64, " + props.image) : img}/>
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


export function UploadButton(props){
    const [fileName,setFileName] = useState("");

    function handleChange(e){
        const reader = new FileReader();
            reader.onload = (e) => {
                props.handleUpload(btoa(e.target.result));
        };
        if(e.target.files !== null){
            reader.readAsBinaryString(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    }

    function removeFile(){
        setFileName("");
        props.removeUpload();
    }

    return(
        <div>
            <Button sx={{margin:"10px"}} variant="contained" size="small" component="label" startIcon={<PhotoCamera />}>
                Upload
                <input hidden accept="image/*" name="imgLoc" onChange={handleChange} type="file" />
            </Button>
            { fileName.length ? <Chip  label={fileName} variant="outlined" color="primary" onDelete={removeFile} /> : ""}
        </div>
    );
}

export function SuccessSnackbars(props) {
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      props.close();
    };
  
    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {props.message}
          </Alert>
        </Snackbar>
    );
}

export function CustomPagination(props){

    const [pageIndex,setPageIndex] = useState(1);

    function changePage(e,_pageIndex){
        if(_pageIndex != pageIndex){
            setPageIndex(_pageIndex);
            props.fetchData(_pageIndex);
        }
    }

    return(
        <div>
            {props.children}
            <Pagination color={props.color? props.color : "primary"} count={props.TotalPage} sx={{margin:"auto",width:"fit-content"}} showFirstButton showLastButton onChange={changePage}/>
        </div>
    ); 
} 

export function SearchBar(props){
    const [searchField,setSearchField] = useState("");

    return(
        <Paper elevation={3} sx={{ display: 'flex', alignItems: 'center', width: 400,margin:"auto",padding:"5px", borderRadius:"10px"}}>
            <SearchIcon />
            <form onSubmit={(e) => {e.preventDefault();props.search(searchField);}}>
            <InputBase sx={{ ml: 1, flex: 1}} placeholder={props.placeholder ? props.placeholder : "Search..."} onChange={(e) =>  setSearchField(e.target.value)} value={searchField}/>
            </form>
        </Paper>
    );
}

export function DateRange(props){

    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [loading,setLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");

    async function search(){
        setLoading(true);
        setErrorMessage("");
        if(!props.allowNull){
            if(!startDate || !endDate){
                setErrorMessage("Must select both Start & End Date");
                setLoading(false);
                return;
            }
            if(startDate > endDate){
                setErrorMessage("Start Date cannot be after end date");
                setLoading(false);
                return;
            }
            await props.search(startDate,endDate);
        }else{
            if(!startDate || !endDate){
                await props.search(startDate,endDate);
            }else if(startDate > endDate){
                setErrorMessage("Start Date cannot be after end date");
                setLoading(false);
                return;
            }else{await props.search(startDate,endDate)};
        }
        setLoading(false);
    }

    return(
        <div style={props.style}>
                {props.label} <input style={{padding:"5px",borderRadius:"5px"}} type="date" value={startDate} onChange={(e)=> setStartDate(e.target.value)}/>
                &nbsp;&nbsp;&nbsp;<b>-</b>&nbsp; <input style={{padding:"5px",borderRadius:"5px"}} type="date" value={endDate} onChange={(e)=> setEndDate(e.target.value)}/>
                &nbsp;&nbsp;&nbsp;&nbsp; <LoadingButton variant="contained" size="small" loading={loading} onClick={search}>{props.buttonName ? props.buttonName : "submit"}</LoadingButton>
                <br/>
                <span style={{color:"red",fontSize:"12pt"}}>{errorMessage}</span> 
        </div>
    );
}