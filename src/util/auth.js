import { Navigate, useLocation, useNavigate } from "react-router-dom";

/**
 * Use to get the authentication token
 */
export const Auth = {
    getJWT: () =>{
        return sessionStorage.getItem('jwtToken');
    }
}

/**
 * contains logic to redirect the user to login page if not logged in, and block access
 */
export function RequireLogin(props){
    const location = useLocation();

    if(Auth.getJWT()){
        if(props.ownerUserOnly){
            if(!JSON.parse(atob(Auth.getJWT().split(".")[1])).Store){
                return(
                    <div><h1 style={{color:"red"}}>Access Denied</h1></div>
                );
            }                
        }
        if(props.customerUserOnly){
            if(JSON.parse(atob(Auth.getJWT().split(".")[1])).role.includes("owner")){
                return(
                    <div><h1 style={{color:"red"}}>Access Denied</h1></div>
                );
            }
        }
        return(
           <div>{props.children}</div>
        );
    }else {
        return <Navigate to={`/login?${location.pathname.replace('/','')}`} replace/>
    }
    
}