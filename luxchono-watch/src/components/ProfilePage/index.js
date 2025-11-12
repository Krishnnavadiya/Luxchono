import React, { useEffect, useState } from "react";
import "./style.scss";
import { Grid } from "@mui/material";
import TextFields from "../common/TextFields";
import HomeIcon from "@mui/icons-material/Home";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AddressDrawer from "../common/AddressDrawer";
import { actions } from "../../redux/store";
import LogoutModal from "../common/LogoutModal";
import { useNavigate } from "react-router-dom";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import ChangePasswordDrawer from "../common/ChangePassword";
import { useEditProfileMutation, useProfileQuery } from "../../api/Login";
import Buttons from "../common/Buttons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { REGEX } from "../../constants/Regex";
import { STRING } from "../../constants/String";
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
  const [checkbox] = useState(false);

  const navigate = useNavigate();

  const { data, isLoading } = useProfileQuery();

  console.log(data, "data");

  const [profileData, setProfile] = useState();

 

  const [EditProfile, { isLoading: profileEditLoading }] =
    useEditProfileMutation();

  const profile = useFormik({
    initialValues: {
      email: "",
      phoneNo: "",
      username: "",
    },
    validationSchema: Yup.object().shape({
      phoneNo: Yup.string()
        .required(STRING.REGISTER_PHONNO_REQUIRED)
        .matches(REGEX.PHONNUMBER, STRING.INVALID_NUMBER),
      username: Yup.string()
        .required(STRING.REGISTER_USERNAME_REQUIRED)
        .matches(REGEX.USERNAME, STRING.USER_NAME_STORANGE),
    }),
    onSubmit: async (values) => {
      const body = {
        username: values?.username,
        phoneNo: values?.phoneNo,
      };
      actions.loder.setLoading(true);
      try {
        const response = await EditProfile(body);
        const { statusCode, message } = response?.data;
        if (statusCode === 200) {
          setNumberChange(true);
          setusernameChange(true);
          toast.success(message);
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.log(error);
      }
      actions.loder.setLoading(false);
    },
  });

  const [numberChange, setNumberChange] = useState(true);
  const [usernameChange, setusernameChange] = useState(true);

  return (
    <>
      <div className="mt-[5rem] ">
        <div className="profile_div lex flex-col p-[1rem]">
          <div>
            <span className="profile_heading text-[28px]">My Account</span>
          </div>
          <div>
            <span
              onClick={() => actions.modal.openLogoutModal()}
              className="login_link text-[18px] underline decoration-lighttext cursor-pointer"
            >
              Logout
            </span>
          </div>

          <div className="pinfo_div mt-[1rem]">
            <div>
              <span className="info_heading text-[20px]">
                personal information
              </span>
            </div>

            <form onSubmit={profile.handleSubmit}>
              <div className="mt-[0.5rem]">
                <Grid container spacing={4}>
                  <Grid item xs={12} lg={3} md={6} sm={6}>
                    <div className="flex flex-col gap-[5px]">
                      <span className="text_heading">Name</span>
                      <TextFields
                        value={profile.values.username}
                        helperText={
                          profile.touched.username && profile.errors.username
                        }
                        onChange={(e) => {
                          profile.handleChange(e);
                          setusernameChange(
                            e.target.value === profileData?.username
                              ? true
                              : false
                          );
                        }}
                        className={"nametext"}
                        name={"username"}
                        placeholder={"Name"}
                        autoComplete={"off"}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} lg={3} md={6} sm={6}>
                    <div className="flex flex-col gap-[5px]">
                      <span className="text_heading">Email</span>
                      <TextFields
                        disabled={true}
                        value={profile.values.email}
                        helperText={
                          profile.touched.email && profile.errors.email
                        }
                        onChange={profile.handleChange}
                        className={"nametext"}
                        name={"email"}
                        placeholder={"Email"}
                        autoComplete={"off"}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} lg={3} md={6} sm={6}>
                    <div className="flex flex-col gap-[5px]">
                      <span className="text_heading">Phone</span>
                      <TextFields
                        type={"number"}
                        value={profile.values.phoneNo}
                        helperText={
                          profile.touched.phoneNo && profile.errors.phoneNo
                        }
                        onChange={(e) => {
                          profile.handleChange(e);
                          setNumberChange(
                            e.target.value === profileData?.phoneNo
                              ? true
                              : false
                          );
                        }}
                        name={"phoneNo"}
                        placeholder={"Phone"}
                        autoComplete={"off"}
                      />
                    </div>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    lg={3}
                    md={6}
                    sm={6}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "1.5rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "end" }}>
                      <Buttons
                        disabled={numberChange && usernameChange}
                        className={"profile_edit_btn"}
                        type={"submit"}
                        text={"Edit"}
                        variant={"contained"}
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </form>

            <div className="mt-[1.5rem]" style={{ minHeight: "32vh" }}>
              <Grid container spacing={4}>
                <Grid item xs={12} lg={3} md={6} sm={12}>
                  <div
                    className="flex flex-col gap-[5px] bg-boxbac p-[0.5rem] rounded-[10px] cursor-pointer"
                    onClick={goToOrder}
                  >
                    <div className="flex  gap-[5px] items-center">
                      <div>
                        <span className="heading_text">My Orders</span>
                      </div>
                      <div>
                        <Inventory2OutlinedIcon className="info_icon " />
                      </div>
                    </div>
                    <div>
                      <span className="heading_dec">View and manage oredr</span>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} lg={3} md={6} sm={12}>
                  <div
                    className="flex flex-col gap-[5px] bg-boxbac p-[0.5rem] rounded-[10px] cursor-pointer"
                    onClick={() => actions.modal.openAddressDrawer()}
                  >
                    <div className="flex  gap-[5px] items-center">
                      <div>
                        <span className="heading_text">Manage Addressess</span>
                      </div>
                      <div>
                        <FmdGoodOutlinedIcon className="info_icon " />
                      </div>
                    </div>
                    <div>
                      <span className="heading_dec">
                        Edit,add or remove your delivery addresses
                      </span>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} lg={4} md={6} sm={12}>
                  <div
                    className="flex flex-col gap-[5px] bg-boxbac p-[0.5rem] rounded-[10px] cursor-pointer"
                    onClick={() => actions.modal.openChangePasswordModal()}
                  >
                    <div className="flex  gap-[5px] items-center">
                      <div>
                        <span className="heading_text">Change Password</span>
                      </div>
                      <div>
                        <ChangeCircleOutlinedIcon className="info_icon " />
                      </div>
                    </div>
                    <div>
                      <span className="heading_dec">
                        Entera your currrent password and Changes it
                      </span>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
      <AddressDrawer showCheckBox={checkbox} />
      <ChangePasswordDrawer />
      <LogoutModal />
    </>
  );
}
