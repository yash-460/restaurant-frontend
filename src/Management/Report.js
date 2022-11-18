import { CircularProgress, Paper, TextField } from "@mui/material";
import { margin } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { Auth } from "../util/auth";
import { Path } from "../util/Constants";
import { RectangularCard } from "../util/UIComponent";


export function Report(){

    const [report,setReport] = useState([]);
    const [period,setPeriod] = useState("2022-04");
    const [loading,setLoading] = useState(false);

    async function fetchReport(period){
        let storeId = JSON.parse(atob(Auth.getJWT().split(".")[1])).Store;
        try{
            let response =await axios.get(
                `${Path.storeService}/Store/report?storeId=${storeId}&period=${period}`,{
                    headers:{
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
                });
            console.log(response);
            setReport(response.data.$values);
        }catch(error){
            console.log(error);
        }
    }

    async function changeDate(e){
        setPeriod(e.target.value);
        if(e.target.value){
            setLoading(true);
            await fetchReport(e.target.value);
            setLoading(false);
        }else{
            setReport([]);
        }
    }

    function displayInfobyProduct(product){
        let body= (
            <div>
                <br/>
                <span>Total Sales: <b>${product.totalAmount}</b> + Tax: <b>${product.totalTax}</b> =  Total: <b>${product.totalAmount + product.totalTax}</b></span>
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
                Date: <input style={{padding:"5px",borderRadius:"5px"}} type="month" value={period} onChange={changeDate}/> &nbsp;&nbsp;&nbsp;&nbsp;{loading ? <CircularProgress /> :""}           
                <br/>
                <br/>
                {report.length? (
                    <div style={{display:"flex",justifyContent: "space-evenly"}}>
                        <span><b>Total Sale: </b>${totalAmount}</span> <span><b>Total Tax: </b>${totalTax}</span><span> <b>Total: </b>${totalAmount + totalTax}</span>
                    </div>
                ): <h2 style={{textAlign:"center"}}>No Data</h2>}
            </Paper>

            {report.length ? report.map(r => displayInfobyProduct(r)) : ""}
        </div>
    );
}