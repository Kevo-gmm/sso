import { useState } from "react";
import { sendReq } from "../../utils";
import Button from "../ui/btn";

export const SSOPanel = () => {
  const [error, setError] = useState("");
  const SSOAuth = async (provider: string) => {
    try {
      const { res, data } = await sendReq({ provider }, "users/sso");
      if (res.ok) {
        window.location.href = data.redirectUrl;
      } else if (data.error) setError(error);
      else setError("Something went wrong. Please try again");
    } catch (error: any) {
      setError(error.message || "Something went wrong. Please try again");
    }
  };

  return (
    <div className="d-grid gap-2">
      <button className="btn btn-outline-light social-btn" onClick={() => SSOAuth("google")}>
        <i className="fa-brands fa-google"></i>
        Continue with Google
      </button>
      <button className="btn btn-outline-light social-btn" onClick={() => SSOAuth("linkedin")}>
        <i className="fab fa-linkedin"></i>
        Continue with LinkedIn
      </button>
      <button className="btn btn-outline-light social-btn" onClick={() => SSOAuth("discord")}>
        <i className="fab fa-discord"></i>
        Continue with Discord
      </button>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};
