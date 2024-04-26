//creating user ID so we can access it any point in our application
import {createContext,useState} from "react";

const UserType = createContext();

const UserContext = ({children}) => {
    const [userId,setUserId] = useState("");
    return (
        <UserType.Provider value={{userId,setUserId}}>
            {children}
        </UserType.Provider>
    )
}

export {UserType,UserContext}