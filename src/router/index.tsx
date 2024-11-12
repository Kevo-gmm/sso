import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import AuthRedirect from "../middleware/redirect";

export const Router = () => {
  return (
    <BrowserRouter>
      <AuthRedirect />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
