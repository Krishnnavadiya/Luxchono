import React, { useState, useEffect } from 'react';
import { IconButton, Typography, Paper, Avatar, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Buttons from '../../common/Buttons';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../style.scss';
import TextFields from '../../common/TextFields';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader';
import { STRING } from '../../../constants/String';
import { useEditBrandMutation } from '../../../api/Brand';

export default function EditBrandPage() {

    const [EditBrand, { isLoading }] = useEditBrandMutation();

    const [imagePreview, setImagePreview] = useState<any>(null);
    const [BrandId, setBrandId] = useState();


    const [iconPreview, setIconPreview] = useState<any>(null);
    const [iconImg, setIconImag] = useState()


    const [BrandImg, setBrandImag] = useState()
    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        EditBrands.setFieldValue("name", state?.name)
        EditBrands.setFieldValue("image", state?.image)
        EditBrands.setFieldValue("icon", state?.icon)
        // setImagePreview(state?.image)
        setBrandImag(state?.image)
        setIconImag(state?.icon)
        setBrandId(state?.id)
    }, [state])

    const navigate = useNavigate();

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            EditBrands.setFieldValue("image", file)
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
            EditBrands.setFieldValue("icon", file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setIconPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setIconPreview(iconPreview);
        }
    };

    const AddIconImg = () => {
        document.getElementById("fileIconInput")?.click()
    };

    const EditBrands = useFormik({
        initialValues: {
            name: '',
            image: '',
            icon: "",
        },

        validationSchema: Yup.object().shape({
            name: Yup.string().trim().required(STRING.BRAND_NAME_REQUIRED).min(3, STRING.BRAND_NAME_FORMAT),
            image: Yup.mixed().required(STRING.BRAND_NAME_IMAGE).test("fileFormat", STRING.IMAGE_FORMATES, (value: any) => {
                if (value) {
                    const acceptedFormats = ["image/svg+xml", "image/png", "image/jpeg", "image/jpg"].includes(value.type);
                    const accepteDefaltFormats = typeof value === 'string' && value.endsWith(".png") || typeof value === 'string' && value.endsWith(".jpeg") ||
                        typeof value === 'string' && value.endsWith(".jpg") || typeof value === 'string' && value.endsWith(".svg");
                    return acceptedFormats || accepteDefaltFormats;
                }
                return true;
            }),
            icon: Yup.mixed().required(STRING.BRAND_ICON_REQUIRED).test("fileFormat", STRING.IMAGE_FORMATES, (value: any) => {
                if (value) {
                    const acceptedFormats = ["image/svg+xml", "image/png", "image/jpeg", "image/jpg"].includes(value.type);
                    const accepteDefaltFormats = typeof value === 'string' && value.endsWith(".png") || typeof value === 'string' && value.endsWith(".jpeg") ||
                        typeof value === 'string' && value.endsWith(".jpg") || typeof value === 'string' && value.endsWith(".svg");
                    return acceptedFormats || accepteDefaltFormats;
                }
                return true;
            }),
        }),

        onSubmit: async (values: any) => {
            values.id = BrandId;
            const response: any = await EditBrand(values);
            const { message, statusCode } = response?.data;
            if (statusCode === 200) {
                toast.success(message);
                navigate("/brand")
            } else {
                toast.error(message);
            }
        },
    });

    const Category = () => {
        navigate("/brand")
    }

    return (
        <>
            <div className='flex gap-[15px] items-center mt-[1rem] add_category'>
                <IconButton className='!bg-main !text-white' onClick={Category}>
                    <ArrowBackIcon className='!text-[20px]' />
                </IconButton>
                <Typography component='p' className='!font-bold !text-[25px]'>
                    {STRING.BRANDEDIT}
                </Typography>
            </div>

            <form onSubmit={EditBrands.handleSubmit}>
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
                                values={EditBrands.values.image}
                                onChange={handleFileChange}
                                id={'fileInput'}
                                type={'file'}
                                accept={'image/*'}
                                style={{ display: 'none' }} />

                            <div className='flex-col'>
                                <Avatar
                                    className='!w-[120px] !h-[120px] !cursor-pointer !rounded-[10px] !bg-white  border-[1px] !border-header'
                                    src={imagePreview === null ? `${BrandImg}` : `${imagePreview}`}
                                    onClick={AddCategoryImg}
                                    alt='Image Preview'>
                                    <CloudUploadIcon className='!text-[3rem] !text-header' />
                                </Avatar>

                                <label className='ml-[1rem]'>
                                    {EditBrands.touched.image && EditBrands.errors.image && (
                                        <Typography variant='caption' className='!font-bold ' color='error'>
                                            {EditBrands.errors.image.toString()}
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
                                values={EditBrands.values.icon}
                                onChange={handleIconFileChange}
                                id={'fileIconInput'}
                                type={'file'}
                                accept={'image/*'} // This will allow only image files
                                style={{ display: 'none' }} />
                            <div className='flex-col'>
                                <Avatar
                                    className='!w-[120px] !h-[120px] !cursor-pointer !rounded-[10px] !bg-white  border-[1px] !border-header'
                                    src={iconPreview === null ? `${iconImg}` : `${iconPreview}`}
                                    onClick={AddIconImg}
                                    alt='Image Preview'>
                                    <CloudUploadIcon className='!text-[3rem] !text-header' />
                                </Avatar>
                                <label className='ml-[1rem]'>
                                    {EditBrands.touched.icon && EditBrands.errors.icon && (
                                        <Typography variant='caption' className='!font-bold ' color='error'>
                                            {EditBrands.errors.icon.toString()}
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

                            <TextFields
                                onChange={EditBrands.handleChange}
                                autoComplete={'off'} placeholder={STRING.BRAND_NAME_PLACHOLDER} value={EditBrands.values.name}
                                helperText={EditBrands.touched.name && EditBrands.errors.name} name={"name"} className={'BrandField'} />
                        </div>
                    </div>
                </Paper>
            </form>

        </>
    );
}
