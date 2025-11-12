import { Paper, Grid, Typography } from "@mui/material";
import LoginImg from "../../assets/image/LoginImg2.svg";
import Logo from "../../assets/image/logo.svg";
import "./style.scss";
import Buttons from "../../components/common/Buttons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-hot-toast';
import Loader from "../../components/common/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { MuiOtpInput } from "mui-one-time-password-input";
import OtpTimer from "../../components/common/OtpTimer";
import { useVerifyEmailMutation, useVerifyOtpMutation } from "../../api/Login";

export default function OtpVerify() {
  const [VerifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [VerifyEmail, { isLoading: LodingVerifyEnail }] =
    useVerifyEmailMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  console.log(state, "state");
  const OtpVerifys = useFormik({
    initialValues: {
      verifyOtp: state?.verifyOtp,
    },
    validationSchema: Yup.object().shape({
      verifyOtp: Yup.string()
        .length(4, "Enter valid OTP")
        .required("OTP is a required "),
    }),
    onSubmit: async (values) => {
      const body = {
        email: state?.email,
        otp: values?.verifyOtp,
      };
      const response = await VerifyOtp(body);
      const { statusCode, message, result } = response?.data;
      if (statusCode === 200) {
        navigate("/register", {
          state: {
            emails: state?.email,
          },
        });
        toast.success(message);
      } else {
        toast.error(message);
      }
    },
  });

  function matchIsNumeric(text) {
    const isNumber = typeof text === "number";
    const isString = typeof text === "string";
    return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
  }

  const validateChar = (value) => {
    return matchIsNumeric(value) && value !== " ";
  };

  const handleResend = async () => {
    const body = {
      email: state?.email,
    };
    const response = await VerifyEmail(body);
    const { statusCode, message, result } = response?.data;
    if (statusCode === 200) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };
  return (
    <div className="flex items-center justify-center  h-[100vh] otpcontainer">
      <Paper className="!rounded-[40px] w-[1080px] overflow-hidden otppepar  paperboxshadow ">
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <div>
              <img src={LoginImg} alt="LoginImg" className="LoginImg" />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <form onSubmit={OtpVerifys.handleSubmit}>
              <div className="flex items-center justify-left  m-[2.5rem] !ml-[1.5rem] !mt-[4rem]">
                <img src={Logo} alt="logo" className="!ml-[1rem]" />
              </div>
              <div className="flex flex-col gap-[5px] !ml-[3rem] !mr-[3rem] lgoinform mt-[1rem]">
                <Typography
                  className="!font-extrabold"
                  variant="h5"
                  component="h5"
                >
                  {"Verify email"}
                </Typography>
                <Typography className="!font-bold text-light" component="span">
                  {`Otp is sent to ${state?.email} Please Check your mail.`}
                </Typography>
                <div className="!mt-[2rem] flex flex-col gap-[20px]">
                  <MuiOtpInput
                    onChange={OtpVerifys.handleChange("verifyOtp")}
                    value={OtpVerifys.values.verifyOtp}
                    TextFieldsProps={{ placeholder: "-" }}
                    // autoFocus
                    length={4}
                    validateChar={validateChar}
                    style={{ fontFamily: "Poppins" }}
                  />
                </div>
                {isLoading || LodingVerifyEnail ? (
                  <div className="flex items-center justify-center mt-[3rem]">
                    <Loader />
                  </div>
                ) : (
                  <>
                    <Buttons
                      type={"submit"}
                      text={"Next"}
                      variant={"contained"}
                      className={"otpButton"}
                    />

                    <div className="flex items-center justify-center mt-[1rem] ">
                      <OtpTimer
                        expiryTimeInSeconds={60}
                        onResend={handleResend}
                      />
                    </div>
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
