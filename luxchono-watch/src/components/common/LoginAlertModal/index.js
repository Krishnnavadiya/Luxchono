import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useSelector } from 'react-redux';
import "./style.scss"
import { actions } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import Buttons from '../Buttons';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';

export default function LoginAlertModal() {

    const DialogOpen = useSelector((state) => state.modal.LoginAlert);
    const navigate = useNavigate()
    const onCancel = () => {
        actions.modal.closeLoginAlertModal();
    }
    const goToLogin = () => {
        navigate("/login")
        onCancel()
    }

    return (
        <Dialog
            open={DialogOpen.open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className='login_alert'>
            <div className='login_alert_content'>
                <DialogContent >
                    <div className='flex flex-col items-center gap-[10px] justify-center'>
                        {/* <LogoutIcon className='text-main' style={{ fontSize: "30px" }} /> */}
                        <div className='flex flex-col'>
                            <div className='flex items-center justify-center gap-[8px]'>
                                <div>
                                    <NotificationImportantOutlinedIcon className='text-main login_icon' />
                                </div>
                                <div>
                                    <span className='text-black login_alert_title mt-[0.2rem] text-start' style={{ fontSize: "22px", fontWeight: "600" }} >
                                        {"Please login now !"}
                                    </span>
                                </div>

                            </div>
                        </div>

                        <div className='btns flex gap-[10px] mt-[0.5rem] w-[100%]'>

                            <Buttons
                                onClick={goToLogin}
                                type={"submit"}
                                text={"Go to login"}
                                variant={"contained"}
                                className={"cancel_btn"}
                            />

                        </div>
                    </div>
                </DialogContent>
            </div>

        </Dialog >
    );
}