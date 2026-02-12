import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext2";
import { Navigate, Outlet } from "react-router";

function AuthMiddleware() {
    const {isLogged} = useContext(AuthContext)

    if(isLogged){
        return <Outlet/>
    }
    else{
        return <Navigate to={'/login'}/>
    }
}

export default AuthMiddleware