import { ShoppingCartOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Dialog, DialogActions, DialogTitle, Paper, Rating, Skeleton, Step, StepConnector, StepLabel, Stepper } from "@mui/material";
import { display } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { Auth } from "../util/auth";
import { Path } from "../util/Constants";
import { ErrorMessage } from "../util/errorMessage";
import { helper } from "../util/helper";
import { RectangularCard, RestaurantHeader } from "../util/UIComponent";

function RateOrder(props){

    const [rating,setRating] = useState(3.5);
    const [btnLoading,setBtnLoading] = useState(false);

    function saveRating(){
        setBtnLoading(true);
        try{
            let response = axios.put(
                Path.OrderService + "/Order/Rate/" + props.orderId,
                {rating : rating},{
                    headers:{
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
                }        
            );
            props.handleClose();
        }catch(error){
            console.log(error);
        }
        setBtnLoading(false);
    }

    return(
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle><Rating name="half-rating" value={rating} precision={0.5} onChange={(event,newVal)=>{setRating(newVal * 2)}} /></DialogTitle>
                <DialogActions>
                    <LoadingButton loading={btnLoading} onClick={saveRating}>Save</LoadingButton>
                    <Button onClick={props.handleClose}>Cancel</Button>
                </DialogActions>
        </Dialog>
    );
}

export function Order(){

    const [failed,setFailed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [Orders,setOrders] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [ratingOrderId,setRatingOrderId] = useState(0);

    useEffect(()=>{
        fetchOrder();
    },[]);

    async function fetchOrder(){
        try{
            let response = await axios.get(
                Path.OrderService + "/Orders",{
                    headers:{
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
                }
            );
            console.log(response);
            setOrders(response.data?.$values);
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


    function displayStatus(activeStep) {
        let steps = ['Waiting Approval','In Progress','Done'];
        
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

    function OpenRatingDialog(id){
        setRatingOrderId(id);
        setDialogOpen(true);
    }
      
    function displayOrder(order){
        let totalAmount = 0;
        for(let i = 0; i < order.orderDetails?.$values.length; i++){
            totalAmount += order.orderDetails?.$values[i].price + (order.orderDetails.$values[i].price * order.tax)/100;
        }
        let body = (
            <div>
                <span>{helper.formatDate(new Date(order.orderedTime))}</span><br/>
                <span>Total: ${totalAmount.toFixed(2)}</span>
                <p><Button variant="outlined">Order Detail</Button>
                &nbsp;&nbsp;
                <Button variant="outlined" onClick={()=>OpenRatingDialog(order.orderId)}>Rate</Button></p>
            </div>
        );
        return (
            <RectangularCard key={order.orderId} header={order.store?.name} body={body}>
                <div style={{textAlign:"center"}}>Status <br/><br/>
                {displayStatus(3)}
                </div>
            </RectangularCard>
        );
    }

    

    return (
        <div>
            {failed ? <h1 style={{textAlign:"center"}}>{ErrorMessage.contactSupport}</h1> :(
                <div>
                    <h1 style={{textAlign:"center"}}>Orders & History</h1>
                    {loading ? Array(4).fill(null).map((u,i)=> dispalySkeleton(i)) : (
                        Orders.length ? <div>{Orders.map(o => displayOrder(o))}</div> : <h2 style={{textAlign:"center"}}>Nothing Ordered yet</h2>
                    )}
                </div>
            )}
            <RateOrder open={dialogOpen} handleClose={()=>setDialogOpen(false)} orderId={ratingOrderId}/>     
        </div>
    );
}