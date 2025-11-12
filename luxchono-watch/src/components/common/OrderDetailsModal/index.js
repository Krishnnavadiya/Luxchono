import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useSelector } from "react-redux";
import "./style.scss";
import { actions } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import Buttons from "../Buttons";
import {
  Box,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Button } from "bootstrap";
import { handleStatusesBadge } from "../customBadge";
import CloseIcon from "@mui/icons-material/Close";
import CancelOrderModal from "../CancelOrderModal";
import dayjs from "dayjs";

export default function OrderDetailsModal() {
  const DialogOpen = useSelector((state) => state.modal.OrderDetails);

  const [orderDetails, setOrderDetails] = useState([]);

  console.log(orderDetails?._id, "orderDetails");

  useEffect(() => {
    setOrderDetails(DialogOpen?.data);
  }, [DialogOpen?.data]);

  const onCancel = () => {
    actions.modal.closeOrderDetailsModal();
  };

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
      label: "Pending",
    },
    {
      label: "Completed",
    },
    {
      label: "Shipped",
    },
    {
      label: "Out Of Delivery",
    },

    {
      label: "Delivered",
    },
  ];

  const handleActiveStep = (status) => {
    if (status === "Pending") {
      return 1;
    } else if (status === "Completed") {
      return 2;
    } else if (status === "Shipped") {
      return 3;
    } else if (status === "Out of Delivery") {
      return 4;
    } else if (status === "Delivered") {
      return 5;
    }
  };

  return (
    <>
      <Dialog
        open={DialogOpen.open}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="order_details"
      >
        <div className="order_details_content">
          <DialogContent>
            <div className="flex flex-col">
              {/* <LogoutIcon className='text-main' style={{ fontSize: "30px" }} /> */}
              <div className="flex  justify-end" onClick={onCancel}>
                <CloseIcon className="text-black cursor-pointer  close_icon" />
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col gap-[2px] ">
                  <span className="order_heading flex gap-[5px]">
                    <span className="text-black">{"Order Id"}</span>
                    <span className="text-main">{orderDetails?.orderId} </span>
                  </span>

                  <div
                    className="flex gap-[5px] text-[14px]"
                    style={{ fontWeight: "600" }}
                  >
                    <span className="text-black">Delivered on</span>
                    <span className="text-main">
                      {dayjs(orderDetails?.deliveryDate).format("MMM DD, YYYY")}
                    </span>
                  </div>

                  <span className="mt-[0.3rem]">
                    <span style={handleStatusesBadge(orderDetails?.status)}>
                      {orderDetails?.status}
                    </span>
                  </span>
                </div>

                <div className="flex mt-[0.7rem]">
                  <Stepper
                    activeStep={handleActiveStep(orderDetails?.status)}
                    orientation="vertical"
                  >
                    {steps.map((step, index) => (
                      <Step key={step.label}>
                        <StepLabel>
                          <span className="order_status">{step.label}</span>
                        </StepLabel>
                        <StepContent>
                          <span className="text-main text-[13px]">
                            {dayjs(orderDetails?.updatedAt)?.format(
                              "MMMM D, YYYY h:mm A"
                            )}
                          </span>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </div>
              </div>

              {console.log(orderDetails?.status, "orderDetails?.status")}

              {orderDetails?.status === ("Completed" || "Pending") && (
                <div className="btns flex gap-[10px] mt-[2rem] items-center justify-center">
                  <Buttons
                    onClick={() => actions.modal.openCancelOrderModal()}
                    text={"Cancel Order"}
                    variant={"contained"}
                    className={"cancel_btn"}
                  />
                </div>
              )}
            </div>
          </DialogContent>
        </div>
      </Dialog>

      <CancelOrderModal orderId={orderDetails?._id} onCancelOrderdetails={onCancel}/>
    </>
  );
}
