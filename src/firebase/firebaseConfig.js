import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAI7PnVSiI_erGMqwVpn2ta5zNtgpcy4bQ",
  authDomain: "my-kitchen-ef6a3.firebaseapp.com",
  projectId: "my-kitchen-ef6a3",
  storageBucket: "my-kitchen-ef6a3.appspot.com",
  messagingSenderId: "42751855563",
  appId: "1:42751855563:web:457ca0f84ed35c576e844e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)

export { auth, googleProvider }