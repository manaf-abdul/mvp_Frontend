import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/Auth/SignUp";
import Login from "./Pages/Auth/SignIn";
import { UserState } from './Context';

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
          path="/login"
          element={<Login/>}
        />
        
      </Routes>
    </>
  );
};

export default CommonRoutes;
