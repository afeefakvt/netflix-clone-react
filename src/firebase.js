import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB3060uip7Tvtku74mbLrTdrmwUzTrRHZ8",
  authDomain: "netflix-clone-b67fb.firebaseapp.com",
  projectId: "netflix-clone-b67fb",
  storageBucket: "netflix-clone-b67fb.appspot.com",
  messagingSenderId: "466967435301",
  appId: "1:466967435301:web:7d4621c2793f5876be87cc"
};

const app = initializeApp(firebaseConfig);
const auth =  getAuth(app);
const db = getFirestore(app )

const signup = async(name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
 
        
    }
}


const login = async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
        
    }

}
const logout = ()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};