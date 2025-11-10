import { Paper, Grid, Typography } from '@mui/material';
import LoginImg from "../../assets/Images/LoginImg2.svg";
import TextFields from '../../components/common/TextFields';
import './style.scss';
import Buttons from '../../components/common/Buttons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { STRING } from '../../constants/String';
import { toast } from 'react-toastify';
import Loader from '../../components/common/Loader';
import { useResetPasswordMutation } from '../../api/Login';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { REGEX } from '../../constants/Regex';
interface ResetFormValues {
    password: string;
    confirmPassword: string;
}
export default function ResetPassword() {
    const [ResetPassword, { isLoading }] = useResetPasswordMutation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const ResetPasswords = useFormik<ResetFormValues>({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object().shape({
            password: Yup.string().required(STRING.RESET_NEW_REQUIRED)
            .matches(REGEX.STORAGE, STRING.PAASWORD_STORANGE),
            confirmPassword: Yup.string()
                .required(STRING.RESET_CONFIRM_REQUIRED)
                .oneOf([Yup.ref('password')], STRING.RESET_MATCH_FORMATE),
        }),
        onSubmit: async (values) => {
            try {
                const body = {
                    newPassword: values?.confirmPassword,
                    id: id
                };
                console.log(body, "bodybody")
                const response: any = await ResetPassword(body);
                const { statusCode, message } = response?.data;
                if (statusCode === 200) {
                    toast.success(message);
                    navigate('/login');
                } else {
                    toast.error(message);
                }
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <div className='flex items-center justify-center  h-[100vh] resetcontainer'>
            <Paper className='!rounded-[40px] w-[1080px] overflow-hidden resetpepar  paperboxshadow '>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                        <div>
                            <img src={LoginImg} alt="LoginImg" className='LoginImg' />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <form onSubmit={ResetPasswords.handleSubmit}>
                            <div className='flex flex-col gap-[5px] !ml-[3rem] !mr-[3rem] lgoinform mt-[6rem]'>
                                <Typography
                                    className='!font-extrabold'
                                    variant='h5'
                                    component="h5">
                                    {STRING.RESET_PASSWORD}
                                </Typography>
                                <Typography
                                    className='!font-bold text-light'
                                    component="span">
                                    {STRING.RESET_PASSWORD_DEC}
                                </Typography>
                                <div className='!mt-[2rem] flex flex-col gap-[20px]' >
                                    <div>
                                        <div className='mb-[7px]'>
                                            <Typography
                                                component="span"
                                                className='!font-bold'>
                                                {STRING.RESET_NEW_PASSWORD}
                                            </Typography>
                                        </div>
                                        <div>
                                            <TextFields
                                                className={'resetField'}
                                                name={'password'}
                                                values={ResetPasswords.values.password}
                                                onChange={ResetPasswords.handleChange}
                                                helperText={ResetPasswords.touched.password && ResetPasswords.errors.password}
                                                placeholder={STRING.RESET_NEW_PLACEHOLDER}
                                                autoComplete={'off'}
                                                type={showPassword ? 'text' : 'password'}
                                                action={togglePasswordVisibility}
                                                endAdornment={true}
                                                icons={showPassword ? <VisibilityIcon className='!text-[1.4rem]' /> : <VisibilityOffIcon className='!text-[1.4rem]' />}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className='mb-[7px]'>
                                            <Typography
                                                component="span"
                                                className='!font-bold'>
                                                {STRING.RESET_CONFIRM_PASSWORD}
                                            </Typography>
                                        </div>
                                        <div>
                                            <TextFields
                                                className={'loginField'}
                                                name={'confirmPassword'}
                                                values={ResetPasswords.values.confirmPassword}
                                                onChange={ResetPasswords.handleChange}
                                                helperText={ResetPasswords.touched.confirmPassword && ResetPasswords.errors.confirmPassword}
                                                placeholder={STRING.RESET_CONFIRM_PLACEHOLDER}
                                                autoComplete={'off'}
                                                type={'password'}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {isLoading ? (<div className='flex items-center justify-center mt-[3rem]'>
                                    <Loader />
                                </div >) : (
                                    <>
                                        <Buttons type={'submit'} text={STRING.SUBMIT} variant={'contained'} className={'resetButton'} />
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