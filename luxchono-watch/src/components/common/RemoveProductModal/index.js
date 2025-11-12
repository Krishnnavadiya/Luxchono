import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useSelector } from 'react-redux';
import "./style.scss"
import { actions } from '../../../redux/store';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Buttons from '../Buttons';
import { useEffect, useState } from 'react';
import { useRemoveToCartMutation } from '../../../api/Cart';
import { toast } from 'react-hot-toast';

export default function RemoveProductDrawer() {

    const DialogOpen = useSelector((state) => state.modal.RemoveDialog);

    const [RemoveCart, { isLoading }] = useRemoveToCartMutation();



    const [cartProduct, setCartProduct] = useState();


    useEffect(() => {
        setCartProduct(DialogOpen?.data)
    }, [DialogOpen])


    const onCancel = () => {
        actions.modal.closeRemoveDialog();
    }

    const handleDeleteCartItem = async () => {
        actions.loder.setLoading(true);

        try {
            const response = await RemoveCart(cartProduct?.product?._id);

            const { statusCode, message, } = response?.data;
            if (statusCode === 200) {
                toast.success(message);
                onCancel()
            } else {
                toast.error(message);
            }
        }
        catch (error) {
            console.log(error)
        }

        actions.loder.setLoading(false);

    }

    return (
        <Dialog
            open={DialogOpen.open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className='remove_item'>
            <div className='logout_content'>
                <DialogContent >
                    <div className='flex flex-col items-center gap-[10px] justify-center'>
                        {/* <LogoutIcon className='text-main' style={{ fontSize: "30px" }} /> */}
                        <div className='flex flex-col  justify-start'>
                            <span className='text-black  flex items-center remove_item_title' style={{ fontSize: "22px", fontWeight: "600" }} >
                                {"Remove Item"}
                                <div>
                                    <ProductionQuantityLimitsIcon className='text-main cart_icon' />
                                </div>
                            </span>
                            <span className='text-lighttext  flex items-center  remove_item_desc mt-[0.2rem]' style={{ fontSize: "17px", fontWeight: "600" }} >
                                {"Are You Sure you want to remove this item from cart ?"}
                            </span>
                        </div>

                        <div className='btns flex gap-[10px] mt-[0.3rem]'>
                            <Buttons
                                onClick={onCancel}
                                type={"submit"}
                                text={"Cancel"}
                                variant={"outlined"}
                                className={"cancel_btn"}
                            />
                            <Buttons
                                onClick={handleDeleteCartItem}
                                type={"submit"}
                                text={"Remove"}
                                variant={"contained"}
                                className={"remove_btn"}
                            />
                        </div>
                    </div>
                </DialogContent>
            </div>

        </Dialog >
    );
}