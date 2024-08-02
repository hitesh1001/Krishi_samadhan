import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({children}) => {
    const [account,setAccount] = useState('')
    const [user,setUser] = useState("");
    const updateUser = (newUser) => {
        setUser(newUser);
    };

    return (
        <DataContext.Provider value={{
            account,
            setAccount,
            user,
            setUser,
            updateUser
        }}> 
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;