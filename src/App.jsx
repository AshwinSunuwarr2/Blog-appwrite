import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import authService from "./appwrite/auth";
import {Header, Footer} from "./components";
import {Outlet} from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  return loading ? ("loading..." ): 
    <div className="min-h-screen flex flex-wrap content-between bg-slate-300">
        <div className="w-full block">
        <Header/>
        <main>
          <Outlet/>
          
        </main>
        <Footer/>
        </div>
    </div>
};
export default App;
