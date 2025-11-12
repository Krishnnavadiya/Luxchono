
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useSelector } from 'react-redux';
import "./style.scss"
import { actions } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import Buttons from '../Buttons';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import { useCartQuantityMutation } from '../../../api/Cart';
import { toast } from 'react-hot-toast';

export default function AddQuantityMoadl() {

    const DialogOpen = useSelector((state) => state.modal.AddQuantity);

    console.log(DialogOpen?.data?.quantity, "quantityValue")

    const [QuantityHandle, { isLoading }] = useCartQuantityMutation()

    const [cartProduct, setCartProduct] = useState();
    const [quantityValue, setQuantityValue] = useState();

    useEffect(() => {
        setCartProduct(DialogOpen?.data)
        setQuantityValue(DialogOpen?.data?.quantity)
    }, [DialogOpen])

    console.log(cartProduct, "cartProduct")


    const navigate = useNavigate()
    const onCancel = () => {
        actions.modal.closeAddQuantityDialog();
    }
    const incrementQuantity = () => {
        setQuantityValue(quantityValue + 1)
    }

    const decrementQuantity = () => {
        setQuantityValue(quantityValue - 1)
    }

    const handleQuantity = async () => {
        actions.loder.setLoading(true);
        const body = {
            id: cartProduct?.product?._id,
            quantity: quantityValue
        }
        try {
            const response = await QuantityHandle(body);

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
            className='add_quantity'>
            <div className='addquantity_content'>
                <div className='flex justify-end p-[0.5rem] pb-[0px]' onClick={onCancel}>
                    <CloseIcon className='text-black close_icon' />
                </div>
                <DialogContent >
                    <div className='flex flex-col items-center gap-[10px] justify-center'>

                        <div className='flex flex-col'>
                            <div className='flex flex-col gap-[12px] items-center justify-center '>

                                <span className='text-black addquantity_title mt-[0.2rem] text-start' style={{ fontSize: "22px", fontWeight: "600" }} >
                                    {"Add Quantity"}
                                </span>

                                <div className='flex flex-row gap-[20px] items-center'>
                                    <div>
                                        <Buttons
                                            onClick={decrementQuantity}
                                            type={"submit"}
                                            text={"-"}
                                            variant={"outlined"}
                                            className={"add_btn"}
                                            disabled={quantityValue === 1}
                                        />

                                    </div>
                                    <span className='text-black text-[20px]'>{quantityValue}</span>

                                    <Buttons
                                        onClick={incrementQuantity}
                                        type={"submit"}
                                        text={"+"}
                                        variant={"outlined"}
                                        className={"less_btn"}

                                    />

                                </div>
                            </div>
                        </div>

                        <div className='btns flex  mt-[0.3rem]'>
                            <Buttons

                                disabled={DialogOpen?.data?.quantity === quantityValue}
                                onClick={handleQuantity}
                                type={"submit"}
                                text={"Done"}
                                variant={"contained"}
                                className={"addquantity_btn"}
                            />
                        </div>
                    </div>
                </DialogContent>
            </div>

        </Dialog >
    );
}