import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "react-auth-57f16.firebaseapp.com",
  projectId: "react-auth-57f16",
  storageBucket: "react-auth-57f16.appspot.com",
  messagingSenderId: "207409404558",
  appId: process.env.REACT_APP_APP_ID,
  measurementId: "G-337GZ3F1NY",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
