import { Navigate, useLocation, useNavigate } from "react-router-dom";

export const Auth = {
    getJWT: () =>{
        return sessionStorage.getItem('jwtToken');
    }
}

export function RequireLogin(props){
    const location = useLocation();

    if(Auth.getJWT()){
        return(
           <div>{props.children}</div>
        );
    }else {
        return <Navigate to={`/login?${location.pathname.replace('/','')}`} replace/>
    }
    
}