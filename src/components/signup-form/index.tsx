import React, { useState } from "react";
import { sendReq } from "../../utils";
import Button from "../ui/btn";
import { Input } from "../ui/inputs";
import { PasswordInput } from "../ui/inputs/password_input";

export const SignUpForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.name.trim() === "" || formData.email.trim() === "" || formData.password.trim() === "") {
      setError("Please fill in all fields");
      return false;
    }
    return true;
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const { res, data } = await sendReq({ name: formData.name, email: formData.email, password: formData.password }, "users/signup");

      if (res.ok) {
        const url = window.localStorage.getItem("redirect_url");
        if (url) window.location.href = `${url}?route=${data.token}`;
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      } else if (data.error) setError(data.error);
      else setError("Something went wrong. Please try again");
    } catch (error: any) {
      setError(error.message || "Something went wrong. Please try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form id="registerForm" method="POST" onSubmit={submitHandler}>
      <Input label="Full Name" type="text" id="name" name="name" placeholder="John doe" required value={formData.name} onChange={handleInputChange} />
      <Input
        label="Email"
        type="text"
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
      <PasswordInput
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        className="form-control"
        id="confirmPassword"
        name="confirmPassword"
        required
        value={formData.confirmPassword}
        onChange={handleInputChange}
        showPassword={showConfirmPassword}
        togglePasswordVisibility={toggleConfirmVisibility}
      />
      {error && <div className="alert alert-danger">{error}</div>}
      <Button type="submit" className="btn btn-primary w-100" disabled={loading} loading={loading}>
        Create Account
      </Button>
    </form>
  );
};
