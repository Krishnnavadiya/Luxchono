import { Checkbox, Drawer, FormControlLabel, Radio } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Buttons from '../../common/Buttons';
import { useSelector } from 'react-redux';
import { actions } from '../../../redux/store';
import './style.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HomeIcon from '@mui/icons-material/Home';
import AddAddressDrawer from '../AddAddressDrawer';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useEffect, useState } from 'react';
import DeleteAddressModal from '../DeleteAddressModal';
import { useGetAddressQuery } from '../../../api/Address';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import Loader from '../Loader';
import NotListedLocationOutlinedIcon from '@mui/icons-material/NotListedLocationOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
function AddressDrawer({ setSelectedDeliveryAddress, showCheckBox }) {

    const DialogOpen = useSelector((state) => state.modal.Address);

    const { data: AddressApiData, isFetching: AddressFetching } = useGetAddressQuery({}, { skip: !DialogOpen.open });

    const [addressData, setAddressData] = useState([]);

    useEffect(() => {
        setAddressData(AddressApiData?.data)
    }, [AddressApiData])

    const navigate = useNavigate()
    const onCancel = () => {
        actions.modal.closeAddressDrawer();
    }

    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        showCheckBox &&
            setSelectedDeliveryAddress(selectedAddress)
    }, [selectedAddress])


    const AddressCheckboxChange = (event) => {
        setSelectedAddress(event.target.name);
    }

    const location = useLocation();
    const { pathname } = location;
    //setps

    return (
        <>
            <Drawer
                className='address_drawer'
                anchor="right"
                open={DialogOpen.open}
                onClose={onCancel}
                transitionDuration={1000}>


                <div className='addres_drawer_div' style={{ width: "400px" }}>
                    {/* ---------------- header ----------------- */}
                    <div className="address_drawer_header_wrapper">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%" }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: "5px", height: "0px" }}>

                                <p className='addres_title'
                                    style={{
                                        color: '#212121',
                                        fontSize: '24px',
                                        fontWeight: "600",
                                        marginLeft: "0.5rem"
                                    }}>
                                    {`My Address`}
                                </p>
                                <HomeOutlinedIcon className='text-main address_icon' />
                            </div>
                            <div onClick={onCancel}>
                                <CloseIcon className="!cursor-pointer text-black mr-[0.5rem]" style={{ cursor: "pointer" }} />
                            </div>
                        </div>
                    </div>
                    {/* ---------------- header ----------------- */}


                    {AddressFetching ? (
                        <div className='flex justify-center items-center h-[90vh]'>
                            <Loader height={"50"} width={"50"} />
                        </div>
                    ) :
                        (
                            <div className='main_address_div' style={{ overflow: "auto", paddingBottom: "6rem" }}>
                                <div className='p-[0.5rem]'>
                                    <Buttons onClick={() => actions.modal.openAddAddressDrawer()} startIcon={<AddCircleOutlineOutlinedIcon className='add_icon' />} text={"Add New Address"} variant={'outlined'} className={"add_address_btn"} />
                                </div>
                                {addressData?.length ? (addressData?.map((address, index) => {

                                    console.log(address, "addressaddress")
                                    return (
                                        <>
                                            <div className='flex flex-col gap-[4px] justify-center paperboxshadow  m-[1rem] p-[1rem]  address_box cursor-pointer' >
                                                <div className='flex justify-between items-center' >
                                                    <div className='flex gap-[5px] items-center' >
                                                        <div>
                                                            {address?.addressType === "Home" ? <HomeIcon /> : <HomeRepairServiceIcon />}
                                                        </div>
                                                        <div>
                                                            <span className='address_type'>
                                                                {address?.addressType === "Home" ? "Home" : "Office"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className='add_check_box flex justify-center text-center  items-center'>
                                                        <Checkbox disableRipple checked={selectedAddress === address?._id} name={address?._id} onChange={AddressCheckboxChange} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <span className='text-main address_name'>{address?.fullName}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <span className='address_line'>
                                                            <span>{`${address?.address} , ${address?.city} , ${address?.state} - `} <span style={{ fontWeight: "600" }}>{`${address?.pincode}`}</span>
                                                            </span>

                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='flex justify-between items-center'>
                                                    <span className='address_phone'>{`${address?.phoneNo}`}</span>
                                                    <div className='flex items-center gap-[5px]'>
                                                        <div onClick={() => actions.modal.openAddAddressDrawer(address)} >
                                                            <EditOutlinedIcon className='text-main cursor-pointer delete_icon' />
                                                        </div>
                                                        <div onClick={() => actions.modal.openDeleteAddressDrawer(address)}>
                                                            <DeleteOutlineOutlinedIcon className='text-red mr-[0.5rem] cursor-pointer delete_icon' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })) : (<div className='flex gap-[5[x]] flex-col items-center justify-center h-[65vh] p-[1rem] text-center w-[100%]'>
                                    <div>
                                        <NotListedLocationOutlinedIcon className='text-main not_add_icon' />
                                    </div>
                                    <div>
                                        <span className='not_add_dec'>{"Delivery address not available , Please add"}</span>
                                    </div>

                                </div>)}

                            </div>)

                    }



                    {/* ----------------  footer ----------------- */}

                    <div className="address_drawer_footer">

                        <div className='flex gap-[10px] justify-end'>
                            <Buttons onClick={onCancel} type={'submit'} text={"Done"} variant={'outlined'} className={'address_close_btn'} />
                        </div>
                    </div>
                    {/* ----------------  footer ----------------- */}


                </div>

            </Drawer>

            <AddAddressDrawer />
            <DeleteAddressModal />
        </>
    );
}

export default AddressDrawer;
