import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const User = createContext();

export default function UserProvider({ children}){
    const lsUser = JSON.parse(localStorage.getItem("user"))
    const [user, setUser] = useState(lsUser)
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if(lsUser === null){
    //         navigate("/")
    //     } else {
    //         navigate("/home")
    //     }
    // },[])

    return(
        <User.Provider value = {{user, setUser}}>
            {children}
        </User.Provider>
    )
}