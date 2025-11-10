import React, { useEffect } from 'react';
import Logo from "../../assets/Images/logo02.svg";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import "./style.scss";
import Buttons from '../../components/common/Buttons';
import { useVerifyEmailQuery } from '../../api/Login';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import { STRING } from '../../constants/String';

export default function VerifyEmail() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
    // Access individual query parameters
    const id = queryParams.get('id');
    const { data, isFetching } = useVerifyEmailQuery<any>(id);
    const Login = () => {
        navigate("/login")
    }
    return (
        <div>
            <div className='navbar'>
                <div>
                    <img style={{ width: "75px", height: "75px" }} src={Logo} alt="LoginImg" className='LoginImg' />
                </div>
                <div>
                    <span className='navbar_heading'> {STRING.LUXCHONO}</span>
                </div>
            </div>
            <div >
                {isFetching ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh" }}>
                        <Loader />
                    </div>

                ) : (
                    <>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "80vh" }}>
                            <div >
                                <TaskAltIcon className='verify_icon' />
                            </div>
                            <span className='div_label'>
                                {data?.message}
                            </span>
                            <Buttons onClick={Login} type={"submit"} text={STRING.NOW_GOTO_LOGIN} variant={"contained"} className={"verifybtton"} />
                        </div>

                    </>
                )
                }
            </div>
        </div>
    );
}
