import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthHandler = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("lw-token");
  const location = useLocation();
  const { pathname } = location;
  const { state } = location;
  useEffect(() => {
    if (token) {
      ["/login", "/register", "/admin-verify-email", "/forgotpassword", "/reset-password"]?.includes(pathname) &&
        navigate("/product");
    } else {
      if (!["/register", "/admin-verify-email", "/forgotpassword", "/reset-password"]?.includes(pathname)) {
        navigate("/login");
      }
    }
  }, [token, pathname]);
  return null;
};

export default AuthHandler;
