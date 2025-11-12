import { Paper, Grid, Typography } from '@mui/material';
import LoginImg from "../../assets/image/LoginImg2.svg";
import Logo from "../../assets/image/logo.svg"
import TextFields from '../../components/common/TextFields';
import './style.scss';
import Buttons from '../../components/common/Buttons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { STRING } from '../../constants/String';
import { REGEX } from '../../constants/Regex';
import { toast } from 'react-hot-toast';
import Loader from '../../components/common/Loader';
import { useForgotPasswordMutation } from '../../api/Login';


export default function ForgotPassword() {
    const [ForgotPassword, { isLoading }] = useForgotPasswordMutation();
  
    return (
        <div className='flex items-center justify-center  h-[100vh] fordatecontainer'>
            <Paper className='!rounded-[40px] w-[1080px] overflow-hidden forgatepepar  paperboxshadow '>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                        <div>
                            <img src={LoginImg} alt="LoginImg" className='LoginImg' />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <form onSubmit={ForgotPasswords.handleSubmit}>
                            <div className='flex items-center justify-left m-[4rem] !ml-[1.5rem] !mt-[4rem]'>
                                <img src={Logo} alt="logo" className='!ml-[1rem]' />
                            </div>
                            <div className='flex flex-col gap-[5px] !ml-[3rem] !mr-[3rem] lgoinform mt-[1rem]'>
                                <Typography
                                    className='!font-extrabold'
                                    variant='h5'
                                    component="h5">
                                    {STRING.FORGATEPASSWORD_LABEL}
                                </Typography>
                                <Typography
                                    className='!font-bold text-light'
                                    component="span">
                                    {STRING.FORGATEPASSWORD_DEC}
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
                                            <TextFields className={'forgateField'} name={'email'} values={ForgotPasswords.values.email} onChange={ForgotPasswords.handleChange} error={ForgotPasswords.touched.email && Boolean(ForgotPasswords.errors.email)}
                                                helperText={ForgotPasswords.touched.email && ForgotPasswords.errors.email} placeholder={STRING.LOGIN_EMAIL_PLACEHOLDER} autoComplete={'off'} />
                                        </div>
                                    </div>
                                </div>
                                {isLoading ? (<div className='flex items-center justify-center mt-[3rem]'>
                                    <Loader />
                                </div >) : (
                                    <>
                                        <Buttons type={STRING.SUBMIT} text={'Submit'} variant={'contained'} className={'forgateButton'} />
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