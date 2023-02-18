import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updatePassword,
} from "firebase/auth";
import { auth } from "../firebase";

const userAuthContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  // 아래 삼총사 === HOXEN 회원가입 / 로그인 / 로그아웃 + firebase 연동
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    return signOut(auth);
  };

  // 비번변경
  const changePassword = (newpassword) => {
    return updatePassword(auth.currentUser, newpassword);
  };

  // 구글 로그인 - context
  const googleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth.currentUser, googleProvider);
  };

  useEffect(() => {
    const unsubscibe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscibe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ signUp, user, logIn, logOut, googleSignIn, changePassword }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
