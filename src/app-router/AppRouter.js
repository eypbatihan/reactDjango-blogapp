import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NewBlog from "../pages/NewBlog";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Details from "../pages/Details";
import UpdateBlog from "../pages/UpdateBlog";

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/newblog" element={<NewBlog />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/details/:cardId" element={<Details />} />
            <Route path="/update/:cardId" element={<UpdateBlog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
