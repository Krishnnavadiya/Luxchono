import { Drawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Buttons from "../../common/Buttons";
import { useSelector } from "react-redux";
import { actions } from "../../../redux/store";
import "./style.scss";
import TextFields from "../TextFields";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from 'react-hot-toast';
import { useChangePasswordMutation } from "../../../api/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { STRING } from "../../../constants/String";
import { REGEX } from "../../../constants/Regex";
function ChangePasswordDrawer() {
  const DialogOpen = useSelector((state) => state.modal.changePassword);

  const [ChangePassword, { isLoading }] = useChangePasswordMutation();
  const onCancel = () => {
    actions.modal.closeChangePasswordModal();
    changePassword.resetForm();
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const togglePasswordNewVisibility = () => {
    setShowPasswordNew((prev) => !prev);
  };

 

  return (
    <>
      <Drawer
        className="add_address_drawer"
        anchor="right"
        open={DialogOpen.open}
        onClose={onCancel}
        transitionDuration={1000}
      >
        <form
          onSubmit={changePassword.handleSubmit}
          className="add_addres_drawer_div"
          style={{ width: "390px" }}
        >
          <div className="add_address_drawer_header_wrapper">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "5px",
                  height: "0px",
                }}
              >
                <p
                  className="add_addres_title"
                  style={{
                    color: "#212121",
                    fontSize: "24px",
                    fontWeight: "600",
                    marginLeft: "0.5rem",
                  }}
                >
                  {`Change Password`}
                </p>
              </div>
              <div onClick={onCancel}>
                <CloseIcon
                  className="!cursor-pointer text-black mr-[0.5rem]  close_icon"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>

          <div
            className="add_address_div"
            style={{ overflow: "auto", paddingBottom: "6rem" }}
          >
            <div className="p-[0.8rem]">
              <div className="first_from_value">
                <div className="flex flex-col gap-[3px]">
                  <span className="input_heading">Current Password</span>
                  <TextFields
                    name={"password"}
                    value={changePassword.values.password}
                    onChange={changePassword.handleChange}
                    helperText={
                      changePassword.touched.password &&
                      changePassword.errors.password
                    }
                    className={"nametext"}
                    placeholder={"Enter Password"}
                    autoComplete={"off"}
                    type={showPassword ? "text" : "password"}
                    action={togglePasswordVisibility}
                    endAdornment={true}
                    icons={
                      showPassword ? (
                        <VisibilityIcon className="!text-[1.1rem]" />
                      ) : (
                        <VisibilityOffIcon className="!text-[1.1rem]" />
                      )
                    }
                  />
                </div>
                <div className="flex flex-col gap-[3px] mt-[0.8rem]">
                  <span className="input_heading">New Password</span>
                  <TextFields
                    name={"newPassword"}
                    value={changePassword.values.newPassword}
                    onChange={changePassword.handleChange}
                    helperText={
                      changePassword.touched.newPassword &&
                      changePassword.errors.newPassword
                    }
                    className={"nametext"}
                    placeholder={"Enter New Password"}
                    autoComplete={"off"}
                    type={showPasswordNew ? "text" : "password"}
                    action={togglePasswordNewVisibility}
                    endAdornment={true}
                    icons={
                      showPasswordNew ? (
                        <VisibilityIcon className="!text-[1.1rem]" />
                      ) : (
                        <VisibilityOffIcon className="!text-[1.1rem]" />
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="add_address_drawer_footer">
            <div className="flex gap-[10px] justify-end">
              <Buttons
                onClick={onCancel}
                type={"submit"}
                text={"Cancel"}
                variant={"outlined"}
                className={"add_close_btn"}
              />
              <Buttons
                type={"submit"}
                text={"Done"}
                variant={"contained"}
                className={"Add_btn"}
              />
            </div>
          </div>
        </form>
      </Drawer>
    </>
  );
}

export default ChangePasswordDrawer;
