import { Paper, Grid, Typography, InputAdornment, IconButton } from '@mui/material'
import LoginImg from "../../assets/Images/LoginImg2.svg";
import TextFields from '../../components/common/TextFields';
import "./style.scss"
import Buttons from '../../components/common/Buttons';
import { useFormik } from 'formik';
import * as Yup from "yup";

import { REGEX } from "../../constants/Regex";
import { toast } from "react-toastify";
import Loader from '../../components/common/Loader';
import { useLoginMutation, useRegisterMutation } from '../../api/Login';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { STRING } from '../../constants/String';
import EmailVeficationModal from '../../components/common/EmailVeficationModal';

interface RegisterFormValues {
    email: string;
    password: string;
    username: string
}

export default function Register() {
    const [Register, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const Registers = useFormik<RegisterFormValues>({
        initialValues: {
            email: "",
            password: "",
            username: ""
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required(STRING.LOGIN_EMAIL_REQUIRED)
                .matches(REGEX.EMAIL, STRING.LOGIN_EMAIL_FORMAT),
            password: Yup.string().required(STRING.LOGIN_PASSWORD_REQUIRED)
                .matches(REGEX.STORAGE, STRING.PAASWORD_STORANGE),
            username: Yup.string().required(STRING.REGISTER_USERNAME_REQUIRED)
                .matches(REGEX.USERNAME, STRING.USER_NAME_STORANGE),
        }),
        onSubmit: async (values) => {
            try {
                const response: any = await Register(values);

                console.log(response, "rrr")
                const { statusCode, message } = response?.data;
                if (statusCode === 200) {
                    handleOpenConfirmation()
                    toast.success(message)
                } else {
                    toast.error(message)
                }
            } catch (error) {
                console.log(error)
            }
        },
    });
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const handleOpenConfirmation = () => {
        setOpenConfirmation(true);
    };
    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
    };

    const Login = () => {
        navigate("/login")
    }

    return (
        <div className='flex items-center justify-center  h-[100vh] registercontainer' >
            <Paper className='!rounded-[40px] w-[1080px] overflow-hidden registerpepar  paperboxshadow' >
                <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                        <div >
                            <img src={LoginImg} alt="LoginImg" className='LoginImg' />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <form onSubmit={Registers.handleSubmit}>
                            {/* <div className='flex items-center justify-center m-[2.5rem]'>
                                <img src={Logo} alt="logo" className='!ml-[1rem]' />
                            </div> */}
                            <div className='flex flex-col gap-[5px] !ml-[3rem] !mr-[3rem] registerform mt-[3rem] '>
                                <Typography
                                    className='!font-bold'
                                    variant='h5'
                                    component="h5">
                                    {STRING.LOGIN_TITAL}
                                </Typography>
                                <Typography
                                    className='!font-bold text-light'
                                    component="span">
                                    {STRING.REGISTER_DESC}
                                </Typography>
                                <div className='!mt-[1.5rem] flex flex-col gap-[20px]' >
                                    <div >
                                        <div className='mb-[5px]'>
                                            <Typography
                                                className='!font-bold'
                                                component="span">
                                                {STRING.LOGIN_EMALI}
                                            </Typography>
                                        </div>
                                        <div>
                                            <TextFields className={"regsiterField"} name={"email"} values={Registers.values.email} onChange={Registers.handleChange}
                                                helperText={Registers.touched.email && Registers.errors.email} placeholder={STRING.LOGIN_EMAIL_PLACEHOLDER} autoComplete={'off'} />
                                        </div>
                                    </div>

                                    <div >
                                        <div className='mb-[5px]'>
                                            <Typography
                                                className='!font-bold'
                                                component="span">
                                                {STRING.REGISTER_USERNAME}
                                            </Typography>
                                        </div>
                                        <div>
                                            <TextFields className={"regsiterField"} name={"username"} values={Registers.values.username} onChange={Registers.handleChange}
                                                helperText={Registers.touched.username && Registers.errors.username} placeholder={STRING.REGISTER_USERNAME_PLACEHOLDER} autoComplete={'off'} />
                                        </div>
                                    </div>

                                    <div>
                                        <div className='mb-[5px]'>
                                            <Typography
                                                component="span"
                                                className='!font-bold'>
                                                {STRING.LOGIN_PASSWORD}
                                            </Typography>
                                        </div>
                                        <div>
                                            <TextFields
                                                className={"regsiterField"}
                                                name={"password"}
                                                values={Registers.values.password}
                                                onChange={Registers.handleChange}
                                                helperText={Registers.touched.password && Registers.errors.password}
                                                placeholder={STRING.LOGIN_PASSWORD_PLACEHOLDER}
                                                autoComplete={'off'}
                                                type={showPassword ? 'text' : 'password'}
                                                action={togglePasswordVisibility}
                                                endAdornment={true}
                                                icons={showPassword ? <VisibilityIcon className='!text-[1.4rem]' /> : <VisibilityOffIcon className='!text-[1.4rem]' />}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {isLoading ? (<div className='flex items-center justify-center mt-[3rem]'>
                                    <Loader />
                                </div >) : (
                                    <>
                                        <Buttons type={"submit"} text={STRING.SIGN_UP} variant={"contained"} className={"registerButton"} />
                                        <span className='flex items-center justify-center mt-[0.2rem] gap-[2px]'>
                                            {STRING.LOGIN_LABEL}
                                            <Link to="/login" className="signin_link" >
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

            <EmailVeficationModal openConfirmation={openConfirmation} handleCloseConfirmation={handleCloseConfirmation} action={Login} />
        </div>
    )
}