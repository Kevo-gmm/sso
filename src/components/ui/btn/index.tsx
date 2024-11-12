import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ loading, children, ...props }) => {
  return (
    <button {...props} className={`d-flex align-items-center justify-content-center gap-2 ${props.className}`} disabled={loading || props.disabled}>
      <span>{children}</span>
      {loading && <i className="fa fa-spinner fa-spin"></i>}
    </button>
  );
};

export default Button;
