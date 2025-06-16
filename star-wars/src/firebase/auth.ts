import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email:any, password:any) =>{
    return createUserWithEmailAndPassword(auth,email,password)
}

export const doSignInWithEmailAndPassword = async (email:any, password:any) =>{
    return signInWithEmailAndPassword(auth,email,password)
}

export const doSignOut = () => {
    return auth.signOut()
}