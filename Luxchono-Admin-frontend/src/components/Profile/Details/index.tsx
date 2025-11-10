import "./style.scss"
import TextFields from '../../common/TextFields'
import Buttons from '../../common/Buttons'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useProfileQuery } from '../../../api/Login';
import { useEffect } from "react";

export default function Details() {

    const { data } = useProfileQuery({});

    useEffect(() => {
        Profile.setFieldValue("email", (data as any)?.data?.email)
        Profile.setFieldValue("username", (data as any)?.data?.username)
    }, [data])

    const Profile = useFormik<any>({
        initialValues: {
            email: '',
            username: '',

        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required("User name is required")
        }),
        onSubmit: async (values, { resetForm }) => {

        },
    });
    return (

        <div style={{ display: "flex", width: "100%", justifyContent: "center" }} >
            <div className='main_div paperboxshadow' >
                <div >
                    <div className='main_heding'>
                        <span>{"Profile"}</span>
                    </div>

                    <form onSubmit={Profile.handleSubmit}>

                        <div className='main_conatine '>

                            <div className='filed_div'>

                                <span>
                                    {"Email"}
                                </span>

                                <TextFields
                                    disabled={true}
                                    value={Profile.values.email}
                                    onChange={Profile.handleChange}
                                    helperText={Profile.touched.email && Profile.errors.email}
                                    name={"email"}
                                    placeholder={"Enter email"}
                                    autoComplete={'off'}
                                />
                            </div>

                            <div className='filed_div'>
                                <span>
                                    {"Username"}
                                </span>

                                <TextFields
                                    disabled={true}
                                    value={Profile.values.username}
                                    onChange={Profile.handleChange}
                                    helperText={Profile.touched.username && Profile.errors.username}
                                    name={"username"}
                                    placeholder={"Enter Username"}
                                    autoComplete={'off'}

                                />
                            </div>

                            {/* <div style={{ display: "flex", justifyContent: "center" }}>
                                <Buttons type={"submit"} text={"Change Passowrd"} variant={"contained"} className={"change_password"} />
                            </div> */}

                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
