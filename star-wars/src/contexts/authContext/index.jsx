// src/contexts/authContext/index.tsx

import React, { useContext, useEffect, useState } from "react"
import { auth } from "../../firebase/firebase"
import { onAuthStateChanged } from "firebase/auth"

// --- CHANGE THIS LINE ---
// From: const AuthContext = React.createContext()
// To:
const AuthContext = React.createContext({
    currentUser: null,
    userLoggedIn: false, // Matches initial state of AuthProvider's useState
    loading: true        // Matches initial state of AuthProvider's useState
});
// -----------------------

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null)
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    // Add console logs for debugging if you still have them, they are useful
    console.log("AuthProvider rendered. Initial loading:", loading);
    console.log("Auth object at AuthProvider import:", auth);

    useEffect(()=>{
        console.log("AuthProvider useEffect: Setting up onAuthStateChanged listener.");
        const unsubscribe = onAuthStateChanged(auth, initializeUser)
        return () => {
            console.log("AuthProvider useEffect: Cleaning up onAuthStateChanged listener.");
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
            {/* Conditional rendering for children based on loading */}
            { children}
        </AuthContext.Provider>
    )
}