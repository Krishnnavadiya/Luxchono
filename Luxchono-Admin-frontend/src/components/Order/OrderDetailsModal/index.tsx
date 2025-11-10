import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useSelector } from 'react-redux';
import "./style.scss"
import { useNavigate } from 'react-router-dom';
import { Box, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { handleStatusesBadge } from '../../common/customBadge';


export default function OrderDetailsModal({ data, openMoreInfo, handleMoreClose }: any) {

    const [orderDetails, setOrderDetails] = useState<any>([]);

    console.log(orderDetails, "orderDetails")

    useEffect(() => {
        setOrderDetails(data)
    }, [data])


    const onCancel = () => {
        handleMoreClose();
    }

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const steps = [
        {
            label: 'Pending',
        },
        {
            label: 'Completed',
        },
        {
            label: 'Shipped',
        },
        {
            label: 'Out Of Delivery',
        },

        {
            label: 'Delivered',
        },
    ];

    const handleActiveStep = (status: any) => {
        if (status === "Pending") {
            return 1
        } else if (status === "Completed") {
            return 2
        } else if (status === "Shipped") {
            return 3
        } else if (status === "Out Of Delivery") {
            return 4
        } else if (status === "Delivered") {
            return 5
        }

    }



    return (
        <>
            <Dialog
                open={openMoreInfo}
                onClose={onCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='order_details'>
                <div className='order_details_content'>
                    <DialogContent >
                        <div className='flex flex-col'>
                            {/* <LogoutIcon className='text-main' style={{ fontSize: "30px" }} /> */}

                            <div className='flex  justify-end' onClick={onCancel}>
                                <CloseIcon className='text-black cursor-pointer  close_icon' />
                            </div>
                            <div className='flex flex-col'>

                                <div className='flex flex-col gap-[2px] '>
                                    <span className='order_heading flex gap-[5px]' >
                                        <span className='text-black'>{"Order Id"}</span>
                                        <span className='text-main'>{orderDetails?.orderId} </span>
                                    </span>

                                    <div className='flex gap-[5px] text-[14px]' style={{ fontWeight: "600" }} >

                                        <span className='text-black'>Delivered on</span>
                                        <span className="text-main">
                                            {dayjs(orderDetails?.deliveryDate).format('MMM DD, YYYY')}
                                        </span>

                                    </div>


                                    <span className='mt-[0.3rem]'>
                                        <span style={handleStatusesBadge(orderDetails?.status)}>
                                            {orderDetails?.status}
                                        </span>
                                    </span>

                                </div>

                                <div className='flex mt-[0.7rem]'>

                                    <Stepper activeStep={handleActiveStep(orderDetails?.status)} orientation="vertical">
                                        {steps.map((step, index) => (
                                            <Step key={step.label}>
                                                <StepLabel>
                                                    <span className='order_status'>{step.label}</span>
                                                </StepLabel>
                                                <StepContent>
                                                    <span className='text-main text-[13px]'>{dayjs(orderDetails?.updatedAt)?.format("MMMM D, YYYY h:mm A")}</span>
                                                </StepContent>
                                            </Step>
                                        ))}
                                    </Stepper>

                                </div>
                            </div>

                            {/* <div className='btns flex gap-[10px] mt-[2rem] items-center justify-center'>


                                <Buttons
                                    onClick={() => actions.modal.openCancelOrderModal()}
                                    text={"Cancel Order"}
                                    variant={"contained"}
                                    className={"cancel_btn"}
                                />

                            </div> */}
                        </div>
                    </DialogContent>
                </div>

            </Dialog >


        </>

    );
}