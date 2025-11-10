import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { Accordion, AccordionDetails, AccordionSummary, Grid, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { handleStatusesBadge } from "../../common/customBadge";
import dayjs from "dayjs";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import "./style.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { STRING } from "../../../constants/String";
import OrderDetailsModal from "../OrderDetailsModal";

export default function ViewOrderPage() {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();

    const goToOrder = () => {
        navigate('/order');
    };



    const [openMoreInfo, setOpenMoreInfo] = useState(false);

    const handleMoreOpen = (row: any) => {
        setOpenMoreInfo(true);

    };

    const handleMoreClose = () => {
        setOpenMoreInfo(false);
    };



    return (

        <>

            <div className='flex gap-[15px] items-center mt-[1rem] add_category'>
                <IconButton className='!bg-main !text-white' onClick={goToOrder}>
                    <ArrowBackIcon className='!text-[20px]' />
                </IconButton>
                <Typography component='p' className='!font-bold !text-[25px]'>
                    {STRING.ORDER_VIEW}
                </Typography>
            </div>
            <div>
                <div className='order_div lex flex-col'>

                    {<div className='oinfo_div mt-[0.3rem]'>

                        <div className='mt-[1.3rem] ' style={{ minHeight: "50vh" }}>
                            <>
                                <Accordion className='mainac mt-[1rem]' defaultExpanded={true} >
                                    <AccordionSummary
                                        style={{ height: "7rem", display: "flex", justifyContent: "start", alignItems: "start" }}
                                        expandIcon={< ExpandMoreIcon style={{ display: "flex", justifyContent: "center" }} />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header">
                                        <div className='accordion_heading '>
                                            <div>
                                                <span >
                                                    <span style={handleStatusesBadge(state?.status)}>
                                                        {state?.status}
                                                    </span>
                                                </span>
                                            </div>
                                            <div className='flex gap-[30px] items-center'>

                                                <div className='flex gap-[2px] items-center'>
                                                    <span className='text-black ordern_titel'>Order Id.</span>
                                                    <span className='text-main  orderv_titel'>{state?.orderId}</span>
                                                </div>
                                            </div>

                                            <div>
                                                <span className='text-lighttext order_date'>{dayjs(state?.date)?.format("MMMM D, YYYY h:mm A")}</span>
                                            </div>
                                        </div>
                                    </AccordionSummary>

                                    <AccordionDetails className='accordioninfo'>

                                        <div className='mb-[1rem] '>

                                            <div className="flex flex-col ">
                                                <div className="mb-[0.5rem]">
                                                    <span className='text-main  email_title'>{state?.user?.email}</span>
                                                </div>

                                                <div className="mb-[0.5rem]">

                                                    <span className='text-black flex gap-[5px] '>
                                                        <span style={{ fontSize: "15px" }}>{"Delivery on"}</span>
                                                        <span style={{ fontSize: "15px", fontWeight: "600" }}> {dayjs(state?.deliveryDate).format('MMM DD, YYYY')}</span>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex gap-[30px]">
                                                <div>
                                                    <div>
                                                        <span className='dd_title'>Delivery details</span>
                                                    </div>

                                                    <div>
                                                        <span className='address_name'>{state?.fullName}</span>
                                                    </div>

                                                    <div>
                                                        <span className='address_phone'>{state?.phoneNo}</span>
                                                    </div>

                                                    <div>
                                                        <span className='address_line'>
                                                            <span>{`${state?.address} , ${state?.city} , ${state?.state} - `} <span >{`${state?.pincode}`}</span>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>


                                                <div>
                                                    <div>
                                                        <div>
                                                            <span className='dd_title'>Payment details</span>
                                                        </div>

                                                        <div>
                                                            <span className='address_name'>{`Total Amount : ${state?.totalAmount?.toLocaleString("en-IN")} ₹`}</span>
                                                        </div>

                                                        <div>
                                                            <span className='address_phone'>{`Discount Amount : ${state?.discountAmount?.toLocaleString("en-IN")} ₹`}</span>
                                                        </div>

                                                        <div>
                                                            <span className='totalAmount'>{`Payment Amount : ${state?.paymentAmount?.toLocaleString("en-IN")} ₹`}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>


                                        </div>

                                        <Grid container spacing={4}  >
                                            {state?.products?.map((products: any, index: any) => {
                                                return (
                                                    <>
                                                        <Grid item xs={12} lg={3} md={6} sm={6}  >
                                                            <div className=' paperboxshadow h-[10rem] flex mb-[1rem] justify-between '  >
                                                                <div className='flex items-center gap-[10px]'>
                                                                    <div className='order_img ' >
                                                                        <img className='w-[100%] h-[100%] object-cover' src={products?.product?.thumbnail}></img>
                                                                    </div>
                                                                    <div className='flex flex-col '>
                                                                        <span className='order_name text-black' >
                                                                            <span>
                                                                                {products?.product?.name}
                                                                            </span>
                                                                        </span>
                                                                        <span className="text-light" style={{ fontSize: "15px", fontWeight: "600" }}>
                                                                            {`(${products?.product?.productModel})`}
                                                                        </span>
                                                                        <span className='order_price text-main'>{`${products?.product?.price.toLocaleString("en-IN")}₹`}</span>
                                                                        <span className='order_quantity text-black'>{`Quantity : ${products?.quantity}`}</span>
                                                                        <span className='order_quantity text-black'>{"Warranty : "}<span className='order_time text-lighttext'>{products?.product?.warranty}</span> </span>
                                                                    </div>
                                                                </div>

                                                                <div className='flex items-center more_icon_div' >
                                                                    <IconButton onClick={handleMoreOpen}>
                                                                        <KeyboardArrowRightIcon className='more_icon text-main' />
                                                                    </IconButton>
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                    </>
                                                )
                                            })}
                                        </Grid>

                                        {/* <div style={{ display: "flex", justifyContent: "right" }}>
                                                    <button className='pdf_download' onClick={() => { }}  >
                                                        <PDFDownloadLink document={<OrderPdf orderData={allOrderData}  />} fileName="Luxchono_Order.pdf">
                                                            {({ blob, url, loading, error }) => (loading ? 'Loading...' : 'Download Order')}
                                                        </PDFDownloadLink>
                                                    </button>
                                                </div> */}

                                    </AccordionDetails>
                                </Accordion>
                            </>

                        </div>
                    </div>

                    }

                </div>
            </div>
            <OrderDetailsModal data={state} openMoreInfo={openMoreInfo} handleMoreClose={handleMoreClose} />

        </>

    )


}


