import React, { useState } from "react";
import { sendReq } from "../../utils";
import Button from "../ui/btn";
import { Input } from "../ui/inputs";
import { PasswordInput } from "../ui/inputs/password_input";

export const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    return true;
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const { res, data } = await sendReq({ email: formData.email, password: formData.password }, "users/login");
      if (res.ok) {
        const url = window.localStorage.getItem("redirect_url");
        if (url) window.location.href = `${url}?route=${data.token}`;
        setFormData({ email: "", password: "" });
      } else if (data.error) setError(data.error);
      else setError("Something went wrong. Please try again");
    } catch (error: any) {
      setError(error.message || "Something went wrong. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="loginForm" method="POST" onSubmit={submitHandler}>
      <Input
        label="Email"
        type="email"
        id="email"
        name="email"
        placeholder="johndoe@example.com"
        required
        value={formData.email}
        onChange={handleInputChange}
      />

      <PasswordInput
        label="Password"
        type={showPassword ? "text" : "password"}
        id="password"
        name="password"
        required
        value={formData.password}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
        onChange={handleInputChange}
      />

      {error && <div className="alert alert-danger">{error}</div>}
      <Button type="submit" className="btn btn-primary w-100" loading={loading} disabled={loading}>
        Sign In
      </Button>
    </form>
  );
};
