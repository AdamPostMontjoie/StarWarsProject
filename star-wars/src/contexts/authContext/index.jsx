import React, { useContext, useEffect, useState } from "react"
import { auth } from "../../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth"

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null)
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, initializeUser)
        return () => {
            unsubscribe();
        };
    },[])

    async function initializeUser(user){
        if(user){
            setCurrentUser({...user})
            setUserLoggedIn(true)
            console.log("AuthProvider: User IS logged in. userLoggedIn set to TRUE.");
        } else{
            setCurrentUser(null)
            setUserLoggedIn(false)
            console.log("AuthProvider: User IS NOT logged in. userLoggedIn set to FALSE."); // Corrected typo here from previous answers
        }
        setLoading(false)
        console.log("AuthProvider: Loading set to FALSE.");
    }
    const value = {
         currentUser,
         userLoggedIn,
         loading
    }
    return (
        <AuthContext.Provider value={value}>
            { children}
        </AuthContext.Provider>
    )
}