// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAj2_XF0sEZG7npaBo2Pqg88VBOOol6uGA",
  authDomain: "fir-web-auth-b2d2b.firebaseapp.com",
  projectId: "fir-web-auth-b2d2b",
  storageBucket: "fir-web-auth-b2d2b.appspot.com",
  messagingSenderId: "878900553179",
  appId: "1:878900553179:web:3283221b84ccc1688733fe",
  measurementId: "G-CWX0DBJ30Z"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth }