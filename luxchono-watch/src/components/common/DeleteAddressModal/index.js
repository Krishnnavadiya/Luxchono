import Dialog from '@mui/material/Dialog';
import React, { useState, useEffect } from 'react'
import DialogContent from '@mui/material/DialogContent';
import { useSelector } from 'react-redux';
import "./style.scss"
import { actions } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import Buttons from '../Buttons';
import { useDeleteAddressMutation } from '../../../api/Address';
import { toast } from 'react-hot-toast';

export default function DeleteAddressModal() {

    const DialogOpen = useSelector((state) => state.modal.DeleteAddress);
    const navigate = useNavigate()

    const [addressId, setAddressId] = useState();

    const [deleteAddress, { isLoading: AddressFetching }] = useDeleteAddressMutation();

    useEffect(() => {
        setAddressId(DialogOpen?.data?._id)
    }, [DialogOpen])

    console.log(addressId, "addressId")


    const onCancel = () => {
        actions.modal.closeDeleteAddressDrawer();
    }

    const handleDeleteAddress = async () => {
        try {
            actions.loder.setLoading(true);
            const response = await deleteAddress(addressId);
            const { statusCode, message, } = response?.data;
            if (statusCode === 200) {
                toast.success(message);
                onCancel();
            } else {
                toast.error(message);
            }
            actions.loder.setLoading(false);
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <Dialog
            open={DialogOpen.open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className='delete_address'>
            <div className='delete_add_content'>
                <DialogContent >
                    <div className='flex flex-col items-center gap-[10px] justify-center'>
                        {/* <LogoutIcon className='text-main' style={{ fontSize: "30px" }} /> */}
                        <div className='flex flex-col'>
                            <div className='flex items-center justify-center '>
                                <span className='text-black  delete_add_title mt-[0.2rem] text-start' style={{ fontSize: "22px", fontWeight: "600" }} >
                                    {"Are You Sure you want to Delete this Address?"}
                                </span>
                            </div>
                        </div>

                        <div className='btns flex gap-[10px] mt-[0.3rem]'>
                            <Buttons
                                onClick={onCancel}
                                type={"submit"}
                                text={"Cancel"}
                                variant={"outlined"}
                                className={"delete_cancel_btn"}
                            />
                            <Buttons
                                onClick={handleDeleteAddress}
                                type={"submit"}
                                text={"Yes"}
                                variant={"contained"}
                                className={"delete_remove_btn"} />
                        </div>
                    </div>
                </DialogContent>
            </div>

        </Dialog >
    );
}