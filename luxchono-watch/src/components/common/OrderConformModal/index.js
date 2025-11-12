import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useSelector } from 'react-redux';
import "./style.scss"
import { actions } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export default function OrderConformModal() {

    const DialogOpen = useSelector((state) => state.modal.OrderConform);
    const navigate = useNavigate()

    const onCancel = () => {
        actions.modal.closeOrderConformModal();
    }

    const goToHome = () => {
        navigate("/home")
        onCancel()
    }


    return (
        <Dialog
            open={DialogOpen.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className='orderConform'>
            <div className='orderConform_content'>
                <DialogContent >
                    <div className='flex flex-col  items-center gap-[5px]' >
                        <div>
                            <TaskAltIcon className='text-main conform_icon' />
                        </div>
                        <div>
                            <span className='conform_heading text-black'>{"Order Placed"}</span>
                        </div>
                        <div className='flex text-center'>
                            <span className='conform_dec text-black'>{"Your Order placed successfully , check Your Order list Thank you"}</span>
                        </div>
                        <div>
                            <span className='conform_date text-black flex gap-[5px] '>
                                <span className='text-main'>Order Date</span>
                                <span className='text-black'>Feb 06,2024</span>
                            </span>
                        </div>

                        <div className="mt-[2rem]" onClick={goToHome} >
                            <span className='conform_link text-main underline  decoration-main cursor-pointer'>{"Back to home"}</span>
                        </div>

                    </div>
                </DialogContent>
            </div>

        </Dialog >
    );
}