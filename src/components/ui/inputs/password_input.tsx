import React from "react";
import { InputProps } from ".";

interface PasswordInputProps extends InputProps {
  showPassword: boolean;
  togglePasswordVisibility: VoidFunction;
}
export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, id, showPassword, togglePasswordVisibility, ...props }, ref) => {
    return (
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          {label}
        </label>
        <div className="position-relative">
          <input className="form-control" id={id} {...props} ref={ref} />
          <button type="button" className="btn btn-link position-absolute top-50 end-0 translate-middle-y" onClick={togglePasswordVisibility}>
            <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
          </button>
        </div>
      </div>
    );
  }
);
