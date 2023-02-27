import { createContext, useContext, useEffect, useState } from "react";
// 로그인
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updatePassword,
} from "firebase/auth";

// todos (database)
import {
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";
import { auth } from "../firebase";

const userAuthContext = createContext();

// collection - 첫번째 파라미터 db / 두번째 firestore 컬렉션 이름
const todoColletction = collection(db, "todos");

class TodosDataService {
  addTodos = (newTodo) => {
    return addDoc(todoColletction, newTodo);
  };

  updateTodos = (id, updateTodo) => {
    const todosDoc = doc(db, "todos", id);
    return updateDoc(todosDoc, updateTodo);
  };

  delTodos = (id) => {
    const todosDoc = doc(db, "todos", id);
    return deleteDoc(todosDoc);
  };

  // 콜렉션에 저장된 전체 데이터
  getAllTodos = () => {
    return getDocs(todoColletction);
  };

  // 수정을 위한 id값으로 한가지 가져오기
  getTodos = (id) => {
    const todoDoc = doc(db, "todos", id);
    return getDoc(todoDoc);
  };
}

// login context api
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
    return signInWithPopup(auth, googleProvider);
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

export default new TodosDataService();
