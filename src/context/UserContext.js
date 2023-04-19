import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }){
    const lsUser = JSON.parse(localStorage.getItem("user"))
    const [user, setUser] = useState(lsUser)

    return(
        <UserContext.Provider value = {{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}