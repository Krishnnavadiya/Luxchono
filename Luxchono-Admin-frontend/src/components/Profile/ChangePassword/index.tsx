import "./style.scss"
import TextFields from '../../common/TextFields'
import Buttons from '../../common/Buttons'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { STRING } from '../../../constants/String';
import { useChangePasswordMutation } from '../../../api/Login';
import { toast } from 'react-toastify';
import Loader from '../../common/Loader';
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { REGEX } from "../../../constants/Regex";

export default function ChangePassword() {

    const [ChangePassword, { isLoading }] = useChangePasswordMutation()
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const togglePasswordNewVisibility = () => {
        setShowPasswordNew((prev) => !prev);
    };

    const ChangePasswords = useFormik<any>({
        initialValues: {
            password: '',
            newPassword: '',
        },
        validationSchema: Yup.object().shape({
            password: Yup.string().required("Password is required")
                .matches(REGEX.STORAGE, STRING.PAASWORD_STORANGE),
            newPassword: Yup.string().required("New Password is required")
                .matches(REGEX.STORAGE, STRING.PAASWORD_STORANGE),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response: any = await ChangePassword(values);

                const { statusCode, message } = response?.data;
                if (statusCode === 200) {
                    toast.success(message);
                    resetForm();
                } else {
                    toast.error(message);
                }
            } catch (error) {
                console.log(error)
            }
        },
    });
    return (

        <div style={{ display: "flex", width: "100%", justifyContent: "center" }} >
            <div className='changemain_div paperboxshadow' >
                <div >
                    <div className='main_heding'>
                        <span>{"Change Password"}</span>
                    </div>

                    <form onSubmit={ChangePasswords.handleSubmit}>

                        <div className='main_conatine '>

                            <div className='filed_div'>

                                <span>
                                    {"Current Password"}
                                </span>

                                <TextFields
                                    value={ChangePasswords.values.password}
                                    onChange={ChangePasswords.handleChange}
                                    helperText={ChangePasswords.touched.password && ChangePasswords.errors.password}
                                    name={"password"}
                                    placeholder={"Enter Password"}
                                    autoComplete={'off'}
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

                            <div className='filed_div'>
                                <span>
                                    {"New Password"}
                                </span>

                                <TextFields
                                    value={ChangePasswords.values.newPassword}
                                    onChange={ChangePasswords.handleChange}
                                    helperText={ChangePasswords.touched.newPassword && ChangePasswords.errors.newPassword}
                                    name={"newPassword"}
                                    placeholder={"Enter New Password"}
                                    autoComplete={'off'}
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

                            <div style={{ display: "flex", justifyContent: "center" }}>
                                {isLoading ? (<Loader />) :
                                    (<Buttons type={"submit"} text={"Change Passowrd"} variant={"contained"} className={"change_password"} />)}
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
