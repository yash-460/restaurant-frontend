import { LoadingButton } from "@mui/lab";
import { CircularProgress, Paper, TextField } from "@mui/material";
import { margin } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { Auth } from "../util/auth";
import { Path } from "../util/Constants";
import { RectangularCard } from "../util/UIComponent";


export function Report(){

    const [report,setReport] = useState([]);
    const [startDate,setStartDate] = useState("2022-11-01");
    const [endDate, setEndDate] = useState("2022-12-01");
    const [loading,setLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");

    async function fetchReport(){
        setErrorMessage("");
        if(!startDate || !endDate){
            setErrorMessage("Must select both Start & End Date");
            return;
        }
        if(startDate > endDate){
            setErrorMessage("Start Date cannot be after end date");
            return;
        }
        setLoading(true);
        let storeId = JSON.parse(atob(Auth.getJWT().split(".")[1])).Store;
        try{
            let response =await axios.get(
                `${Path.storeService}/Store/report?storeId=${storeId}&startDate=${startDate}&endDate=${endDate}`,{
                    headers:{
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
                });
            console.log(response);
            setReport(response.data.$values);
        }catch(error){
            console.log(error);
            setErrorMessage("Something Went Wrong! contact Support");
        }
        setLoading(false);
    }

    function displayInfobyProduct(product){
        let body= (
            <div>
                <br/>
                <span><b>Total Sales: </b>${product.totalAmount} + <b> Tax: </b>${product.totalTax} = <b>  Total: </b>${(product.totalAmount + product.totalTax).toFixed(2)}</span>
            </div>
        );
        return(
            <RectangularCard key={product.productId} header={product.productName} body={body} sx={{maxWidth:"500px"}} >
                {product.quantity} &nbsp;&nbsp;<b>Qty</b>
            </RectangularCard>
        );
    }
    let totalAmount = 0;
    let totalTax = 0;
    if(report.length){      
        for(let i = 0; i < report.length; i++){
            totalAmount += report[i].totalAmount;
            totalTax += report[i].totalTax;
        }
    }
    return(
        <div>
            <Paper elevation={3} sx={{margin:"auto",marginTop:"20px", minWidth:"fit-content",padding:"20px", maxWidth:"800px"}}>
                <h1 style={{textAlign:"center",marginTop:"0px"}}>Report</h1>
                Time Period: <input style={{padding:"5px",borderRadius:"5px"}} type="date" value={startDate} onChange={(e)=> setStartDate(e.target.value)}/>
                &nbsp;&nbsp;&nbsp;<b>-</b>&nbsp; <input style={{padding:"5px",borderRadius:"5px"}} type="date" value={endDate} onChange={(e)=> setEndDate(e.target.value)}/>
                 &nbsp;&nbsp;&nbsp;&nbsp; <LoadingButton variant="contained" loading={loading} onClick={fetchReport}>Search</LoadingButton>          
                <br/>
                <span style={{color:"red",fontSize:"12pt"}}>{errorMessage}</span> 
                <br/>
                <br/>
                {report.length? (
                    <div style={{display:"flex",justifyContent: "space-evenly"}}>
                        <span><b>Total Sale: </b>${totalAmount}</span> <span><b>Total Tax: </b>${totalTax}</span><span> <b>Total: </b>${(totalAmount + totalTax).toFixed(2)}</span>
                    </div>
                ): <h2 style={{textAlign:"center"}}>No Data</h2>}
            </Paper>

            {report.length ? report.map(r => displayInfobyProduct(r)) : ""}
        </div>
    );
}