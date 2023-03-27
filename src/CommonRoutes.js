import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/Auth/SignUp";
import Login from "./Pages/Auth/SignIn";
import { UserState } from './Context';
import UpdateProfile from "./Pages/UpdateProfile";
import TopNav from "./components/TopNav/TopBar";
import Home from "./Pages/Home";

const CommonRoutes = () => {
    const { user, setUser } = UserState()
  return (
    <>
    <TopNav/>
      <Routes>
        <Route
          path="/signup"
          element={<SignUp/>}
        />
        <Route
          path="/"
          element={<Login/>}
        />
         <Route
          path="/home"
          element={<Home/>}
        />
         <Route
          path="/update-profile"
          element={<UpdateProfile/>}
        />
        
      </Routes>
    </>
  );
};

export default CommonRoutes;
