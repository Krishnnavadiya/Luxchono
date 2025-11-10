import React, { useState } from 'react';
import { IconButton, Typography, Paper, Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Buttons from '../../common/Buttons';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../style.scss';
import TextFields from '../../common/TextFields';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader';
import { STRING } from '../../../constants/String';
import { useAddBrandMutation } from '../../../api/Brand';

export default function AddBrandPage() {
    const [imagePreview, setImagePreview] = useState<any>(null);
    const [iconPreview, setIconPrerview] = useState<any>(null);
    const [AddBrandData, { isLoading }] = useAddBrandMutation();
    const navigate = useNavigate();

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            AddBrand.setFieldValue("image", file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(imagePreview);
        }
    };

    const AddCategoryImg = () => {
        document.getElementById("fileInput")?.click()
    };


    //icon uplaod
    const handleIconFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            AddBrand.setFieldValue("icon", file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setIconPrerview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setIconPrerview(iconPreview);
        }
    };

    const AddIconImg = () => {
        document.getElementById("fileIconInput")?.click()
    };

    const AddBrand = useFormik({
        initialValues: {
            name: '',
            image: '',
            icon: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().trim().required(STRING.BRAND_NAME_REQUIRED).min(3, STRING.BRAND_NAME_FORMAT),
            image: Yup.mixed().required(STRING.BRAND_NAME_IMAGE)
                .test("fileFormat", STRING.IMAGE_FORMATES, (value: any) => {
                    if (value) {
                        const acceptedFormats = ["image/svg+xml", "image/png", "image/jpeg", "image/jpg"].includes(value.type);
                        return acceptedFormats;
                    }
                    return true;
                }),
            icon: Yup.mixed().required(STRING.BRAND_ICON_REQUIRED).test("fileFormat", STRING.IMAGE_FORMATES, (value: any) => {
                if (value) {
                    const acceptedFormats = ["image/svg+xml", "image/png", "image/jpeg", "image/jpg"].includes(value.type);
                    return acceptedFormats;
                }
                return true;
            }),
        }),

        onSubmit: async (values: any) => {
            const response: any = await AddBrandData(values);
            const { message, statusCode } = response?.data;
            if (statusCode === 200) {
                toast.success(message);
                navigate("/brand")
            } else {
                toast.error(message);
            }
        },
    });

    const Brand = () => {
        navigate("/brand")
    }

    return (
        <>
            <div className='flex gap-[15px] items-center mt-[1rem] add_category'>
                <IconButton className='!bg-main !text-white' onClick={Brand}>
                    <ArrowBackIcon className='!text-[20px]' />
                </IconButton>
                <Typography component='p' className='!font-bold !text-[25px]'>
                    {STRING.BRANDADD}
                </Typography>
            </div>

            <form onSubmit={AddBrand.handleSubmit}>
                <Paper className='mt-[1.5rem]  p-[1rem] pb-[2rem] paperboxshadow'>
                    <div className='flex justify-end'>
                        {isLoading ? (<Loader />) : (<Buttons type={"submit"} className={'brand_add_button'} startIcon={<BookmarkIcon />} variant={'contained'} text={'Save'} />)}
                    </div>
                    <div className='flex !flex-col mt-[1rem] pl-[3rem] pr-[3rem] '>
                        <div className='flex item-center !gap-[15px]'  >

                            <div className='w-[11rem] !flex !justify-end mt-[0.5rem] '>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.BARND_IMAGE}
                                </Typography>
                            </div>

                            <TextFields
                                name={"image"}
                                values={AddBrand.values.image}
                                onChange={handleFileChange}
                                id={'fileInput'}
                                type={'file'}
                                accept={'image/*'}
                                style={{ display: 'none' }} />

                            <div className='flex-col'>
                                <Avatar
                                    className='!w-[120px] !h-[120px] !cursor-pointer !rounded-[10px] !bg-white  border-[1px] !border-header'
                                    src={imagePreview}
                                    onClick={AddCategoryImg}
                                    alt='Image Preview'>
                                    <CloudUploadIcon className='!text-[3rem] !text-header' />
                                </Avatar>

                                <label className='ml-[1rem] '>
                                    {AddBrand.touched.image && AddBrand.errors.image && (
                                        <Typography variant='caption' className='!font-bold ' color='error'>
                                            {AddBrand.errors.image.toString()}
                                        </Typography>
                                    )}
                                </label>
                            </div>
                        </div>

                        <div className='flex item-center !gap-[15px] mt-[1rem]'  >

                            <div className='w-[11rem] !flex !justify-end mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.ICON}
                                </Typography>
                            </div>

                            {/* <TextFields name={"image"} values={AddCategory.values.image} onChange={handleFileChange} id={'fileInput'} type={'file'} style={{ display: 'none' }} /> */}
                            <TextFields
                                name={"icon"}
                                values={AddBrand.values.icon}
                                onChange={handleIconFileChange}
                                id={'fileIconInput'}
                                type={'file'}
                                accept={'image/*'} // This will allow only image files
                                style={{ display: 'none' }} />

                            <div className='flex-col'>
                                <Avatar
                                    className='!w-[120px] !h-[120px] !cursor-pointer !rounded-[10px] !bg-white  border-[1px] !border-header'
                                    src={iconPreview}
                                    onClick={AddIconImg}
                                    alt='Image Preview'>
                                    <CloudUploadIcon className='!text-[3rem] !text-header' />
                                </Avatar>
                                <label className='ml-[1rem]'>
                                    {AddBrand.touched.icon && AddBrand.errors.icon && (
                                        <Typography variant='caption' className='!font-bold ' color='error'>
                                            {AddBrand.errors.icon.toString()}
                                        </Typography>
                                    )}
                                </label>
                            </div>
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.BARND_NAME}
                                </Typography>
                            </div>

                            <TextFields autoComplete={'off'} placeholder={STRING.BRAND_NAME_PLACHOLDER} values={AddBrand.values.name}
                                onChange={AddBrand.handleChange}
                                helperText={AddBrand.touched.name && AddBrand.errors.name} name={"name"} className={'BrandField'} />
                        </div>
                    </div>
                </Paper>
            </form>
        </>
    );
}
