import { Paper, Grid, Typography, InputAdornment, IconButton } from '@mui/material'
import LoginImg from "../../assets/Images/LoginImg2.svg";
import Logo from "../../assets/Images/logo.svg"
import TextFields from '../../components/common/TextFields';
import "./style.scss"
import Buttons from '../../components/common/Buttons';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { STRING } from '../../constants/String';
import { REGEX } from "../../constants/Regex";
import { toast } from "react-toastify";
import Loader from '../../components/common/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useLoginMutation } from '../../api/Login';

interface LoginFormValues {
    email: string;
    password: string;
}

export default function Login() {
    const [Login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const login = useFormik<LoginFormValues>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required(STRING.LOGIN_EMAIL_REQUIRED)
                .matches(REGEX.EMAIL, STRING.LOGIN_EMAIL_FORMAT),
            password: Yup.string().required(STRING.LOGIN_PASSWORD_REQUIRED)
                .matches(REGEX.STORAGE, STRING.PAASWORD_STORANGE),
        }),
        onSubmit: async (values) => {
            try {
                const response: any = await Login(values);

                console.log(response, "responseee")
                const { success, message, token, data } = response?.data;
                if (success) {
                    toast.success(message)
                    await localStorage.setItem("lw-token", token)
                    await localStorage.setItem("lw-username", data?.username)
                    navigate("/product")
                } else {
                    toast.error(message)
                }
            } catch (error) {
                console.log(error)
            }
        },
    });

    return (
        <div className='flex items-center justify-center  h-[100vh] logincontainer'>
            <Paper className='!rounded-[40px] w-[1080px] overflow-hidden loginpepar paperboxshadow'>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                        <div>
                            <img src={LoginImg} alt="LoginImg" className='LoginImg' />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <form onSubmit={login.handleSubmit}>
                            {/* <div className='flex items-center justify-center m-[2.5rem]'>
                                <img src={Logo} alt="logo" className='!ml-[1rem]' />
                            </div> */}
                            <div className='flex flex-col gap-[5px] !ml-[3rem] !mr-[3rem] lgoinform mt-[6rem]'>
                                <Typography
                                    className='!font-bold !text-[28px]'
                                    variant='h5'
                                    component="h5">
                                    {STRING.LOGIN_TITAL}
                                </Typography>
                                <Typography
                                    className='!font-bold text-light'
                                    component="span">
                                    {STRING.LOGIN_DESC}
                                </Typography>
                                <div className='!mt-[2rem] flex flex-col gap-[20px]' >
                                    <div >
                                        <div className='mb-[7px]'>
                                            <Typography
                                                className='!font-bold'
                                                component="span">
                                                {STRING.LOGIN_EMALI}
                                            </Typography>
                                        </div>
                                        <div>
                                            <TextFields className={"loginField"} name={"email"} values={login.values.email} onChange={login.handleChange}
                                                helperText={login.touched.email && login.errors.email} placeholder={STRING.LOGIN_EMAIL_PLACEHOLDER} autoComplete={'off'} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className='mb-[7px]'>
                                            <Typography
                                                component="span"
                                                className='!font-bold'>
                                                {STRING.LOGIN_PASSWORD}
                                            </Typography>
                                        </div>
                                        <div>
                                            <TextFields
                                                className={"loginField"}
                                                name={"password"}
                                                values={login.values.password}
                                                onChange={login.handleChange}
                                                helperText={login.touched.password && login.errors.password}
                                                placeholder={STRING.LOGIN_PASSWORD_PLACEHOLDER}
                                                autoComplete={'off'}
                                                type={showPassword ? 'text' : 'password'}
                                                action={togglePasswordVisibility}
                                                endAdornment={true}
                                                icons={showPassword ? <VisibilityIcon className='!text-[1.4rem]' /> : <VisibilityOffIcon className='!text-[1.4rem]' />}
                                            />
                                        </div>
                                        <Link className='flex justify-end mt-[0.2rem] text-main text-[15px] cursor-pointer' to={'/forgotpassword'} >
                                            {STRING.FORGOT_PASSWORD_LINK}
                                        </Link>
                                    </div>
                                </div>
                                {isLoading ? (<div className='flex items-center justify-center mt-[3rem]'>
                                    <Loader />
                                </div >) : (
                                    <>
                                        <Buttons type={"submit"} text={STRING.LOGIN_BUTTON} variant={"contained"} className={"loginButton"} values={login.values.password} />

                                        <div className='flex items-center justify-center gap-[4px] mt-[0.5rem]'>
                                            <Typography component="span">
                                                {STRING.REGISTER_LABEL}
                                                <a href='/register' className='!font-bold text-main underline'>
                                                    {STRING.SIGN_UP}
                                                </a>
                                            </Typography>
                                        </div>
                                    </>

                                )}
                            </div>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}
