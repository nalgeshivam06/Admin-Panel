import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInAdmin } from "./Login/authSlice";

function Protected({children}) {
    const admin = useSelector(selectLoggedInAdmin)

    if(!admin){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    return children;
}

export default Protected;