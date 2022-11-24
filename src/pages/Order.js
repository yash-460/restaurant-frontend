import { ShoppingCartOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Rating, Skeleton, Step, StepConnector, StepLabel, Stepper } from "@mui/material";
import { display } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { Auth } from "../util/auth";
import { Path } from "../util/Constants";
import { ErrorMessage } from "../util/errorMessage";
import { helper } from "../util/helper";
import { CustomPagination, DateRange, RectangularCard, RestaurantHeader } from "../util/UIComponent";
import {OrderDetail,  RateOrder } from "./Order_Partial";


export function Order(){

    const [failed,setFailed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [Orders,setOrders] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");

    const [detailDialogOpen,setDetailDialogOpen] = useState(false);
    const [detailDialogOrder, setDetailDialogOrder] = useState(null);

    const [rateDialogOpen,setRateDialogOpen] = useState(false);
    const [rateOrder, setRateOrder] = useState(null);

    // Order Detail Dialog logic Start
    function OpenRateDialog(order){
        setRateOrder(order);
        setRateDialogOpen(true);
    }

    function handleRateClose(){
        setRateDialogOpen(false);
    }
    // ORder Detail Dialog Logic End

    // Order Detail Dialog logic Start
    function openDetailDialog(order){
        setDetailDialogOrder(order);
        setDetailDialogOpen(true);
    }

    function handleDetailClose(){
        setDetailDialogOpen(false);
    }
    // ORder Detail Dialog Logic End
    
    useEffect(()=>{
        fetchOrder();
    },[]);

    async function fetchOrder(page,start,end){
        try{
            let response = await axios.get(
                `${Path.OrderService}/Orders?startDate=${start == null ? startDate : start}&endDate=${end ==  null ? endDate : end}&pageSize=6&pageIndex=${page ? page : 1}`,{
                    headers:{
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
                }
            );
            console.log(response);
            setTotalPage(response.data?.totalPages);
            setOrders(response.data?.items.$values);
        }catch (error){
            console.log(error);
            setFailed(true);
        }
        setLoading(false);
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


    function displayStatus(status) {
        let steps = ['In-Progress','Done'];
        let activeStep = 0;
        if(status == steps[0])
            activeStep = 0;
        else
            activeStep = 2;
        return (
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label} >
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        );
    }
      
    function displayOrder(order){
        let totalAmount = 0;
        for(let i = 0; i < order.orderDetails?.$values.length; i++){
            totalAmount += order.orderDetails?.$values[i].price * order.orderDetails?.$values[i].quantity + (order.orderDetails?.$values[i].price * order.orderDetails?.$values[i].quantity * order.tax)/100;
        }
        let body = (
            <div>
                <span>{helper.formatDate(new Date(order.orderedTime))}</span><br/>
                <span>Total: ${totalAmount.toFixed(2)}</span>
                <p><Button variant="outlined" onClick={()=>{openDetailDialog(order)}}>Order Detail</Button>
                &nbsp;&nbsp;
                <Button variant="outlined" onClick={()=>{OpenRateDialog(order)}}>Rate</Button></p>
            </div>
        );
        return (
            <RectangularCard key={order.orderId} header={order.store?.name} body={body}>
                <div style={{textAlign:"center"}}>Status <br/><br/>
                {displayStatus(order.status)}
                </div>
            </RectangularCard>
        );
    }

    async function search(start,end){
        console.log("start - end");
        console.log(start);
        setStartDate(start);
        setEndDate(end);
        await fetchOrder(1,start,end);
    }

    return (
        <div>
            {failed ? <h1 style={{textAlign:"center"}}>{ErrorMessage.contactSupport}</h1> :(
                <div>
                    <h1 style={{textAlign:"center"}}>Orders & History</h1>
                    <DateRange search={search} allowNull={true} buttonName="filter" style={{marginLeft:"auto",textAlign:"center"}}/>
                    {loading ? Array(4).fill(null).map((u,i)=> dispalySkeleton(i)) : (
                        Orders.length ? <CustomPagination TotalPage={totalPage} fetchData={fetchOrder}>{<div>{Orders.map(o => displayOrder(o))}<br/><br/></div>}</CustomPagination> : <h2 style={{textAlign:"center"}}>No Ordere Found</h2>
                    )}
                    <br/><br/>
                </div>
            )}
            <RateOrder open={rateDialogOpen} handleClose={handleRateClose} order={rateOrder}/>
            <OrderDetail open={detailDialogOpen} handleClose={handleDetailClose} order={detailDialogOrder}/>
        </div>
    );
}