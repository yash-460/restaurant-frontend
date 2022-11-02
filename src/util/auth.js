import { Navigate, useNavigate } from "react-router-dom";

export const Auth = {
    getJWT: () =>{
        return localStorage.getItem('jwtToken');
    }
}

export function RequireLogin(props){
    if(Auth.getJWT()){
        return(
           <div>{props.children}</div>
        );
    }else {
        return <Navigate to="/login" replace/>
    }
    
}