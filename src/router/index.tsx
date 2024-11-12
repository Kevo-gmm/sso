import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import AuthRedirect from "../middleware/redirect";
import ForgotPassword from "../pages/forgot-password"; 
import ResetPassword from "../pages/reset-password";

export const Router = () => {
  return (
    <BrowserRouter>
      <AuthRedirect />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};
