import React, { useEffect, useRef, useState } from 'react';
import { Avatar, IconButton, Paper, Typography } from '@mui/material';
import Buttons from '../../common/Buttons';
import { STRING } from '../../../constants/String';
import TextFields from '../../common/TextFields';
import Selects from '../../common/Selects';
import Textareas from '../../common/Textarea';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGetAllBrandApiQuery } from '../../../api/Brand';
import { useGetAllProductQuery } from '../../../api/Product';
import { useEditOfferMutation } from '../../../api/Offer';
import { toast } from 'react-toastify';
import Loader from '../../common/Loader';
import { BASE_URL } from '../../../api/Utils';
import { Discount } from '../../../constants/Array';
import ReactDateRangePicker from '../../common/DateRangePicker';

export default function EditOfferPage() {
    const location = useLocation();
    const { state } = location;
    const { data: ProductData } = useGetAllProductQuery({
        search: "", category: "", brands: "", startPrice: "", endPrice: "", startStockRange: "", endStockRange: ""
    });
    const [EditProduct, { isLoading }] = useEditOfferMutation();
    const navigate = useNavigate();
    const [filteredProduct, setFilteredProduct] = useState<any[]>([]);
    const [selectedProductValues, setSelectedProductValues] = useState<any[]>([]);
    const [OfferId, setOfferId] = useState();
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [imagePreview, setImagePreview] = useState<any>(null);
    const [OfferImage, setOfferImage] = useState();

    const offer = () => {
        navigate('/offer');
    };

    console.log(state, "statestate")

    useEffect(() => {
        AddOffer.setFieldValue('name', state?.name);
        AddOffer.setFieldValue('description', state?.description);
        AddOffer.setFieldValue('percentage', state?.offer);
        setFromDate(state?.startDate);
        setToDate(state?.endDate);
        setOfferImage(state?.image);
        setOfferId(state?.id);
        AddOffer.setFieldValue('image', state?.image);
        setSelectedProductValues(state?.defaultProducts);
    }, [state]);

    console.log(ProductData, "ProductDataProductData")

    //product api
    useEffect(() => {
        const filterProducts = ProductData?.data && (ProductData?.data as any[]).map((product: any) => ({
            label: product.name,
            value: product._id
        }));
        setFilteredProduct(filterProducts);
        const ProductValues = (selectedProductValues as any)?.value;
        AddOffer.setFieldValue('product', ProductValues);
    }, [ProductData, selectedProductValues]);

    //brand api 
    //form data
    const AddOffer = useFormik({
        initialValues: {
            image: '',
            name: '',
            description: '',
            percentage: '',
            startDate: '',
            endDate: '',
            product: ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().trim().required(STRING.OFFER_OFFERNAME_REQUIRED).min(3, STRING.OFFER_OFFERNAME_FORMATE),
            percentage: Yup.string().trim().required(STRING.OFFER_DISOUNT_REQUIRED),
            product: Yup.string().required(STRING.OFFER_PRODUCTS_REQUIRED),
            image: Yup.mixed().required(STRING.OFFER_IMAGE_REQUIRED).test('fileFormat', STRING.IMAGE_FORMATES, (value: any) => {
                if (value) {
                    const acceptedFormats = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/jpg'].includes(value.type);
                    const accepteDefaltFormats = typeof value === 'string' && value.endsWith('.png') || typeof value === 'string' && value.endsWith('.jpeg') ||
                        typeof value === 'string' && value.endsWith('.jpg') || typeof value === 'string' && value.endsWith('.svg');
                    return acceptedFormats || accepteDefaltFormats;
                }
                return true;
            }),
        }),
        onSubmit: async (values: any) => {
            values.id = OfferId;
            const response: any = await EditProduct(values);
            const { message, statusCode } = response?.data;
            if (statusCode === 200) {
                toast.success(message);
                navigate('/offer');
            } else {
                toast.error(message);
            }
        },
    });

    //image uplaod 
    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            AddOffer.setFieldValue('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(imagePreview);
        }
    };

    const AddOfferImg = () => {
        document.getElementById('fileInput')?.click();
    };

    //date range
    const wrapperRef = useRef(null);
    const [states, setStates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);
    const [prevDate, setPrevDate] = useState(states);
    const [showDateRangePicker, setShowDateRangePicker] = useState(false);

    //date and percentage type


    useEffect(() => {
        AddOffer.setFieldValue('startDate', fromDate);
        AddOffer.setFieldValue('endDate', toDate);
    }, [fromDate, toDate]);

    useEffect(() => {
        AddOffer.setFieldValue('startDate', fromDate);
        AddOffer.setFieldValue('endDate', toDate);
    }, [fromDate, toDate]);

    return (
        <>
            <div className='flex gap-[15px] items-center mt-[1rem] add_category'>
                <IconButton className='!bg-main !text-white' onClick={offer}>
                    <ArrowBackIcon className='!text-[20px]' />
                </IconButton>
                <Typography component='p' className='!font-bold !text-[25px]'>
                    {STRING.OFFER_EDIT}
                </Typography>
            </div>
            <form onSubmit={AddOffer.handleSubmit} className='add_offer'>
                <Paper className='mt-[1.5rem] paperboxshadow p-[1rem]'>
                    <div className='flex justify-end'>
                        {isLoading ? (<Loader />) : (<Buttons type={'submit'} className={'category_add_button'} startIcon={<BookmarkIcon />} variant={'contained'} text={STRING.SAVE} />)}
                    </div>
                    <div className='flex !flex-col mt-[1rem] pl-[3rem] pr-[3rem] '>
                        <div className='flex item-center !gap-[15px] mt-[1rem]'>
                            <div className='w-[11rem] !flex !justify-end mt-[0.5rem] '>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_IMAGE}
                                </Typography>
                            </div>
                            <TextFields
                                name={'image'}
                                values={AddOffer.values.image}
                                onChange={handleFileChange}
                                id={'fileInput'}
                                type={'file'}
                                accept={'image/png'}
                                style={{ display: 'none' }} />
                            <div className='flex-col'>
                                <Avatar
                                    src={imagePreview === null ? `${OfferImage}` : `${imagePreview}`}
                                    onClick={AddOfferImg}
                                    className='!w-[120px] !h-[120px] !cursor-pointer !rounded-[10px] !bg-white  border-[1px] !border-header'
                                    alt='Image Preview'>
                                    <CloudUploadIcon className='!text-[3rem] !text-header' />
                                </Avatar>
                            </div>
                            <div className='flex items-end' >
                                {AddOffer.touched.image && AddOffer.errors.image && (
                                    <Typography variant='caption' className='!font-bold ' color='error'>
                                        {AddOffer.errors.image.toString()}
                                    </Typography>
                                )}
                            </div>
                        </div>
                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_NAME}
                                </Typography>
                            </div>
                            <TextFields
                                helperText={AddOffer.touched.name && AddOffer.errors.name} onChange={AddOffer.handleChange} value={AddOffer.values.name} autoComplete={'off'} placeholder={STRING.OFFER_NAME_PLACHOLDER}
                                name={'name'} className={'productField'} />
                        </div>
                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_DATE}
                                </Typography>
                            </div>
                            <div className='flex-col' style={{ width: '100%' }}>
                                <ReactDateRangePicker
                                    wrapperRef={wrapperRef}
                                    state={states}
                                    setState={setStates}
                                    prevDate={prevDate}
                                    setPrevDate={setPrevDate}
                                    fromDate={fromDate}
                                    setFromDate={setFromDate}
                                    toDate={toDate}
                                    setToDate={setToDate}
                                    showDateRangePicker={showDateRangePicker}
                                    setShowDateRangePicker={setShowDateRangePicker}
                                />
                                {(AddOffer.submitCount > 0 && !fromDate && !toDate) && (
                                    <Typography variant='caption' className='!font-bold !ml-[1rem]' color='error'>
                                        {STRING.OFFER_DISCOUNT_REQUIRED}
                                    </Typography>
                                )}
                            </div>
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_PRODUCT}
                                </Typography>
                            </div>
                            <div className='flex-col w-[100%]'>
                                <Selects menuPlacement={"top"} options={filteredProduct} selectedValues={selectedProductValues} setSelectedValues={setSelectedProductValues} placeholder={STRING.OFFER_PRODUCTS_PLACHOLDER} height={'45px'} />
                                {(AddOffer.submitCount > 0 && AddOffer.errors.product) && (
                                    <Typography variant='caption' className='!font-bold !ml-[1rem]' color='error'>
                                        {AddOffer.errors.product.toString()}
                                    </Typography>
                                )}
                            </div>
                        </div>
                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_DISCOUNT}
                                </Typography>
                            </div>
                            <TextFields
                                helperText={AddOffer.touched.percentage && AddOffer.errors.percentage} onChange={AddOffer.handleChange} value={AddOffer.values.percentage} type={'number'} autoComplete={'off'} placeholder={STRING.OFFER_DISCOUNT_PLACHOLDER}
                                name={'percentage'} className={'productField'} />
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.OFFER_DESCRIPTION}
                                </Typography>
                            </div>
                            <Textareas
                                helperText={AddOffer.touched.description && AddOffer.errors.description} onChange={AddOffer.handleChange} value={AddOffer.values.description} name={'description'} rows={3} placeholder={STRING.OFFER_DESCRIPTION_PLACHOLDER} />
                        </div>
                        <div>
                        </div>
                    </div>
                </Paper>
            </form>
        </>
    );
}


