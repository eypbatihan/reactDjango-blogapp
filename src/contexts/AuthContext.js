import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, onValue, query, ref } from "firebase/database";
import { createContext, useEffect, useState } from "react";
import { auth } from "../helpers/firebase";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("tokenKey") || null
  );
  const [cardsArray, setCardsArray] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [user1, setUser1] = useState(localStorage.getItem("user1") || null);
  const [authToken, setAuthToken] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const auth = async () => {
    setCurrentUser(localStorage.getItem("tokenKey"));
    setUser(localStorage.getItem("user"));
    setUser1(localStorage.getItem("user1"));
  };
  console.log(user);
  console.log(user1);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     setCurrentUser(currentUser);
  //     setUser(currentUser.email);
  //     setName(currentUser.displayName);
  //   });
  // }, []);

  // useEffect(() => {
  //   getCardsArray();
  //   // setIsLoading(false);
  // }, []);

  // let getCardsArray = async () => {
  //   let response = await fetch("http://127.0.0.1:8000/blog/listcreate/");
  //   let data = await response.json();
  //   setCardsArray(data.results);
  // };

  // useEffect(() => {
  //   setIsLoading(true);
  //   const db = getDatabase();

  //   const useRef = ref(db, "card");

  //   onValue(query(useRef), (snapShot) => {
  //     const cards = snapShot.val();
  //     const array = [];

  //     for (let id in cards) {
  //       array.push({ id, ...cards[id] });
  //     }
  //     setCardsArray(array);
  //     setIsLoading(false);
  //   });
  // }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, cardsArray, user, user1, isLoading, auth }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
