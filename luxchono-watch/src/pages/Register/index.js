import { Paper, Grid, Typography } from "@mui/material";
import LoginImg from "../../assets/image/LoginImg2.svg";
import TextFields from "../../components/common/TextFields";
import "./style.scss";
import Buttons from "../../components/common/Buttons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { STRING } from "../../constants/String";
import { REGEX } from "../../constants/Regex";
import { toast } from 'react-hot-toast';
import Loader from "../../components/common/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRegisterMutation } from "../../api/Login";

export default function Register() {
  const [Register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const location = useLocation();
  const { state } = location;

  const email = state?.emails;

  console.log(state, "statestate");
  const Registers = useFormik({
    initialValues: {
      phoneNo: "",
      username: "",
      password: "",
      email: state && state?.emails,
    },
    validationSchema: Yup.object().shape({
      phoneNo: Yup.string()
        .required(STRING.REGISTER_PHONNO_REQUIRED)
        .matches(REGEX.PHONNUMBER, STRING.INVALID_NUMBER),
      username: Yup.string()
        .required(STRING.REGISTER_USERNAME_REQUIRED)
        .matches(REGEX.USERNAME, STRING.USER_NAME_STORANGE),
      password: Yup.string()
        .required(STRING.LOGIN_PASSWORD_REQUIRED)
        .matches(REGEX.STORAGE, STRING.PAASWORD_STORANGE),
    }),
    onSubmit: async (values) => {
      try {
        const response = await Register(values);
        const { statusCode, message, result } = response?.data;
        console.log(response?.data, "result");
        if (statusCode === 200) {
          toast.success(message);
          navigate("/login");
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="flex items-center justify-center  h-[100vh] registercontainer">
      <Paper className="!rounded-[40px] w-[1080px] overflow-hidden registerpepar  paperboxshadow ">
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <div>
              <img src={LoginImg} alt="LoginImg" className="LoginImg" />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <form onSubmit={Registers.handleSubmit}>
              {/* <div className='flex items-center justify-center m-[2.5rem]'>
                                <img+ src={Logo} alt="logo" className='!ml-[1rem]' />
                            </div> */}
              <div className="flex flex-col gap-[5px] !ml-[3rem] !mr-[3rem] registerform mt-[3rem] ">
                <Typography
                  className="!font-extrabold"
                  variant="h5"
                  component="h5"
                >
                  <span>
                    {STRING.LOGIN_TITAL}
                    <span></span>
                  </span>
                </Typography>
                <Typography className="!font-bold text-light" component="span">
                  <span className="flex items-center gap-[5px]">
                    <span>{STRING.REGISTER_DESC}</span>
                    <span className="text-main">{email}</span>
                  </span>
                </Typography>

                <div className="!mt-[1rem] flex flex-col gap-[20px]">
                  <div>
                    <div className="mb-[5px]">
                      <Typography className="!font-bold" component="span">
                        {STRING.REGISTER_USERNAME}
                      </Typography>
                    </div>
                    <div>
                      <TextFields
                        className={"regsiterField"}
                        name={"username"}
                        values={Registers.values.username}
                        onChange={Registers.handleChange}
                        helperText={
                          Registers.touched.username &&
                          Registers.errors.username
                        }
                        placeholder={STRING.REGISTER_USERNAME_PLACEHOLDER}
                        autoComplete={"off"}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-[5px]">
                      <Typography className="!font-bold" component="span">
                        {STRING.REGISTER_PHONNO}
                      </Typography>
                    </div>
                    <div>
                      <TextFields
                        type={"number"}
                        className={"regsiterField"}
                        name={"phoneNo"}
                        values={Registers.values.phoneNo}
                        onChange={Registers.handleChange}
                        helperText={
                          Registers.touched.phoneNo && Registers.errors.phoneNo
                        }
                        placeholder={STRING.REGISTER_PHONNO_PLACEHOLDER}
                        autoComplete={"off"}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-[5px]">
                      <Typography component="span" className="!font-bold">
                        {STRING.LOGIN_PASSWORD}
                      </Typography>
                    </div>
                    <div>
                      <TextFields
                        className={"regsiterField"}
                        name={"password"}
                        values={Registers.values.password}
                        onChange={Registers.handleChange}
                        helperText={
                          Registers.touched.password &&
                          Registers.errors.password
                        }
                        placeholder={STRING.LOGIN_PASSWORD_PLACEHOLDER}
                        autoComplete={"off"}
                        type={showPassword ? "text" : "password"}
                        action={togglePasswordVisibility}
                        endAdornment={true}
                        icons={
                          showPassword ? (
                            <VisibilityIcon className="!text-[1.4rem]" />
                          ) : (
                            <VisibilityOffIcon className="!text-[1.4rem]" />
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                {isLoading ? (
                  <div className="flex items-center justify-center mt-[3rem]">
                    <Loader />
                  </div>
                ) : (
                  <>
                    <Buttons
                      type={"submit"}
                      text={STRING.SIGN_UP}
                      variant={"contained"}
                      className={"registerButton"}
                    />
                    <span className="flex items-center justify-center mt-[0.2rem] gap-[2px]">
                      {STRING.LOGIN_LABEL}
                      <Link to="/login" className="signin_link">
                        {STRING.SIGN_IN}
                      </Link>
                    </span>
                  </>
                )}
              </div>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
