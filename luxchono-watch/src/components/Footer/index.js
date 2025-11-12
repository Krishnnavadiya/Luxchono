import React from "react";
import "./style.scss";
import { Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Logo from "../../assets/image/logo02.svg";
import TextFields from "../common/TextFields";
import { STRING } from "../../constants/String";
import Buttons from "../common/Buttons";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <div className="mt-[3rem]">
        <Grid container spacing={3} className="footer_grid bg-darkbg">
          <Grid item xs={12} lg={3} md={4} sm={4}>
            <div className="flex flex-col p-[1rem] gap-[0.5rem] justify-center">
              {/* <div className="flex items-center gap-[10px] text-secondary ">
                            <img
                                src={Logo}
                                alt="Logo"
                                style={{ width: "70px", height: "70px" }}
                            />
                            <div>
                                <span className='text-[25px]'> {"Luxchono"}</span>
                            </div>
                        </div> */}
              <div>
                <span
                  className="text-[20px] text-white    capitalize"
                  style={{ fontWeight: "600" }}
                >
                  {" "}
                  {"Subscribe to our email alerts!"}
                </span>
              </div>

              <div className="flex gap-[10px]">
                <TextFields
                  className={"loginField"}
                  name={"email"}
                  values={""}
                  onChange={""}
                  // helperText={login.touched.email && login.errors.email}
                  placeholder={STRING.LOGIN_EMAIL_PLACEHOLDER}
                  autoComplete={"off"}
                />
                <Buttons
                  type={"submit"}
                  variant={"outlined"}
                  className={"emailButton"}
                  endIcon={
                    <SendIcon
                      className="text-secondary"
                      style={{ fontSize: "20px" }}
                    />
                  }
                ></Buttons>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} lg={3} md={4} sm={4}>
            <div className="flex flex-col p-[1rem] gap-[0.5rem] justify-center">
              <div>
                <span
                  className="text-[18px] text-white capitalize underline decoration-secondary"
                  style={{ fontWeight: "600" }}
                >
                  {" "}
                  {"customer Services"}
                </span>
              </div>

              <div className="flex gap-[10px]">
                <ul className="flex flex-col gap-[5px]">
                  <li
                    className="text-white text-[15px] li_underline"
                    style={{ fontWeight: "300" }}
                  >
                    {"Payment Options"}
                  </li>
                  <li
                    className="text-white text-[15px] li_underline"
                    style={{ fontWeight: "300" }}
                  >
                    {" "}
                    {"Track Order"}
                  </li>
                  <li
                    className="text-white text-[15px] li_underline"
                    style={{ fontWeight: "300" }}
                  >
                    {"Encircle Program"}
                  </li>
                  <li
                    className="text-white text-[15px] li_underline"
                    style={{ fontWeight: "300" }}
                  >
                    {"Why Buy Direct"}
                  </li>
                  <li
                    className="text-white text-[15px] li_underline"
                    style={{ fontWeight: "300" }}
                  >
                    {"Bulk Orders"}
                  </li>
                  <li
                    className="text-white text-[15px] li_underline"
                    style={{ fontWeight: "300" }}
                  >
                    {"Warranty & Support"}
                  </li>
                </ul>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} lg={3} md={4} sm={4}>
            <div className="flex flex-col p-[1rem] gap-[0.5rem] justify-center">
              <div>
                <span
                  className="text-[18px] text-white capitalize underline decoration-secondary"
                  style={{ fontWeight: "600" }}
                >
                  {" "}
                  {"Contact Us"}
                </span>
              </div>

              <div className="flex gap-[10px]">
                <ul className="flex flex-col gap-[5px]">
                  <li
                    className="text-white text-[15px] li_underline"
                    style={{ fontWeight: "300" }}
                  >
                    {"+91 8780529184"}
                  </li>
                  <li
                    className="text-white text-[15px] li_underline"
                    style={{ fontWeight: "300" }}
                  >
                    {" "}
                    {"luxchono@gmail.com"}
                  </li>
                  <li
                    className="text-white text-[15px] li_underline"
                    style={{ fontWeight: "300" }}
                  >
                    {"Help & Contact"}
                  </li>
                  <li
                    className="text-white text-[15px] li_underline"
                    style={{ fontWeight: "300" }}
                  >
                    {"FAQs"}
                  </li>
                </ul>
              </div>

              <div className="mt-[1rem]">
                <span
                  className="text-[18px] text-white capitalize underline decoration-secondary"
                  style={{ fontWeight: "600" }}
                >
                  {" "}
                  {"Policies"}
                </span>
              </div>
              <div className="flex gap-[10px]">
                <ul className="flex flex-col gap-[5px]">
                  <Link
                    className="text-white text-[15px] li_underline"
                    style={{ fontWeight: "300" }}
                    to={"/privacy-policy"}
                  >
                    {"privacy-policy"}
                  </Link>
                  <Link
                    className="text-white text-[15px] li_underline"
                    style={{ fontWeight: "300" }}
                    to={"/privacy-policy"}
                  >
                    {"terms and conditions"}
                  </Link>
                </ul>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} lg={3} md={4} sm={4}>
            <div className="flex flex-col p-[1rem] gap-[0.5rem] justify-center">
              <div>
                <span
                  className="text-[18px] text-white capitalize underline decoration-secondary"
                  style={{ fontWeight: "600" }}
                >
                  {" "}
                  {"Let's get social"}
                </span>
              </div>
              <div className="flex gap-[10px]">
                <div className="flex  gap-[12px] cursor-pointer">
                  <InstagramIcon className="text-lighttext" />
                  <XIcon className="text-lighttext" />
                  <YouTubeIcon className="text-lighttext" />
                  <FacebookIcon className="text-lighttext" />
                </div>
              </div>

              {/* <div className='mt-[1rem]'>
                                <span className='text-[18px] text-white capitalize underline decoration-secondary' style={{ fontWeight: "600" }}> {"Payment System"}</span>
                            </div> */}
              {/* <a href="https://razorpay.com/" target="_blank">
                                <img src='https://badges.razorpay.com/badge-dark.png' alt="Razorpay | Payment Gateway | Neobank" style={{ height: "45px", width: "113px" }}></img>
                            </a> */}
            </div>
          </Grid>
        </Grid>
      </div>

      <div
        className="bg-darkbg flex justify-center items-center h-[4rem] "
        style={{ borderTop: "0.5px solid #A9A9A9" }}
      >
        <span className="text-lighttext" style={{ fontWeight: "500" }}>
          &#169; 2024 Luxchono Limited. All Rights Reserved
        </span>
      </div>
    </>
  );
}
