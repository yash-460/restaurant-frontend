import { Card, Pagination, TablePagination } from "@mui/material";
import { Children, useEffect, useState } from "react";
import { Path } from "../pages/Constants";

function Paginator(props){
    
    const [rawData, setRawData] = useState({});

    useEffect(function(){
      fetch(Path.baseURL + ':3111/api/')
       .then((response) => console.log(response))
       .then((data) => console.log(data));
    },[]);

    const handleChange = (event,page) => {
      console.log(event);
      console.log(page);
      //<Pagination count={10} showFirstButton showLastButton  onChange={handleChange}/>
      
    }
  return (
      <div> 
        
        </div>
    );
}

export {Paginator};