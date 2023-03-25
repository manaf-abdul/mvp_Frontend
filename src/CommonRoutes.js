import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/Auth/SignUp";
import Login from "./Pages/Auth/SignIn";
import { UserState } from './Context';
import Home from "./Pages/Home";
import UpdateProfile from "./Pages/UpdateProfile";

const CommonRoutes = () => {
    const { user, setUser } = UserState()
  return (
    <>
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
