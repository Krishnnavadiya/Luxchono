import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthHandler = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("lw-token");
  const location = useLocation();
  const { pathname } = location;
  const { state } = location;
  const email = state?.email;
  const emails = state?.emails;
  console.log(email, "email");
  useEffect(() => {
    if (token) {
      ["/login", "/emailverify", "/register", "/otpverify", "/forgotpassword", "/reset-password"]?.includes(
        pathname
      ) && navigate("/home");
    } else {
      if (
        ![
          "/register",
          "/emailverify",
          "/otpverify",
          "/forgotpassword",
          "/reset-password",
          "/home",
          "/login",
          "/productdetails",
          "/products",
          "/order",
          "/profile",
          "/paymentorder"
        ]?.includes(pathname)
      ) {
        navigate("/login");
      }
    }
  }, [token, pathname]);

  useEffect(() => {
    if (!email && ["/otpverify"]?.includes(pathname)) {
      navigate("/emailverify");
    } else if (!emails && ["/register"]?.includes(pathname)) {
      navigate("/otpverify");
    }
  }, [navigate]);

  return null;
};

export default AuthHandler;
