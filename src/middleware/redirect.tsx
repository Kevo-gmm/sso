import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthRedirect = () => {
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("route");
    const redirect_url = urlParams.get("redirect_url");

    if (token) {
      const url = window.localStorage.getItem("redirect_url");
      if (url) window.location.href = `${url}?route=${token}`;
    }
    if (redirect_url) window.localStorage.setItem("redirect_url", redirect_url);
  }, [location]);

  return null;
};

export default AuthRedirect;
