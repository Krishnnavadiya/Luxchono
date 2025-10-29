import React, { useEffect, useState } from 'react';
import { IconButton, Typography, Paper, Avatar, Select, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Buttons from '../../common/Buttons';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import * as Yup from 'yup';
import '../style.scss';
import TextFields from '../../common/TextFields';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useGetAllCategoryQuery } from '../../../api/Category';
import { useLocation, useNavigate } from 'react-router-dom';
import { STRING } from '../../../constants/String';
import Textareas from '../../common/Textarea';
import Selects from '../../common/Selects';
import { useGetAllBrandApiQuery } from '../../../api/Brand';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { useEditProductMutation } from '../../../api/Product';
import { toast } from 'react-toastify';
import Loader from '../../common/Loader';
import Switchs from '../../common/Switchs';

export default function EditProductPage() {
    const location = useLocation();
    const { state } = location;
    const [imagePreviews, setImagePreviews] = useState<any[]>([]);
    const [ProductImages, setProductImages] = useState<any[]>([]);
    const [filteredCategory, setFilteredCategory] = useState<any[]>([]);
    const [isActive, setIsActive] = useState<any>(true);
    const [filteredBrand, setFilteredBrand] = useState<any[]>([]);
    const { data: CategoryData, isFetching: CategoryFetching } = useGetAllCategoryQuery({});
    const navigate = useNavigate();
    const [selectedCategoryValues, setSelectedCategoryValues] = useState<any[]>([]);
    const [selectedBrandValues, setSelectedBrandValues] = useState<any>()
    const [thumbnailimagePreview, setThumbnailImagePreview] = useState<any>(null);
    const [thumbnailImage, setThumbnailImage] = useState();

    // const [AddProducts, { isLoading }] = useAddProductMutation();
    const [EditProduct, { isLoading }] = useEditProductMutation();

    const [ProductId, setProductId] = useState();
    const { data: BrandData, isFetching: BrandFetching } = useGetAllBrandApiQuery({});
    const removeImage = (indexToRemove: number) => {
        setImagePreviews((prevPreviews) => prevPreviews.filter((_, index) => index !== indexToRemove));
        setProductImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
        AddProduct.setFieldValue(
            'image',
            AddProduct.values.image.filter((_: any, index: number) => index !== indexToRemove)
        );
    };

    console.log(state, "state")


    useEffect(() => {
        AddProduct.setFieldValue("name", state?.name)
        AddProduct.setFieldValue("description", state?.description)
        AddProduct.setFieldValue("stock", state?.stock)
        AddProduct.setFieldValue("price", state?.price)
        AddProduct.setFieldValue("category", state?.categorys)
        AddProduct.setFieldValue("productModel", state?.productModel)
        AddProduct.setFieldValue("warranty", state?.warranty)
        AddProduct.setFieldValue("dummyPrice", state?.dummyPrice)
        AddProduct.setFieldValue("thumbnail", state?.thumbnail)
        setIsActive(state?.isActive)
        setSelectedBrandValues(state?.brands)
        setSelectedCategoryValues(state?.defaultcategory)
        setThumbnailImage(state?.thumbnail)
        AddProduct.setFieldValue("thumbnail", state?.thumbnail)
        setImagePreviews(state?.image)
        AddProduct.setFieldValue("image", state?.image)
        setProductId(state?.id)
    }, [state])

    //product image upload
    const AddCategoryImg = () => {
        document.getElementById("fileInput")?.click()
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map((file: File) => {
                const reader = new FileReader();
                return new Promise<string>((resolve) => {
                    reader.onloadend = () => {
                        resolve(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                });
            });
            Promise.all(newImages).then((results) => {
                setImagePreviews((prevPreviews) => [...prevPreviews, ...results]);
                setProductImages((prevImages) => [...prevImages, ...Array.from(files)]);
                AddProduct.setFieldValue('image', [...AddProduct.values.image, ...Array.from(files)]);
            });
        }
    };

    // thumbnail upload
    const AddThumbnailImage = () => {
        document.getElementById("fileInput2")?.click()
    };
    const handleThumbnailChanges = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            AddProduct.setFieldValue("thumbnail", file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setThumbnailImagePreview(thumbnailimagePreview);
        }
    };

    //category select
    useEffect(() => {
        const filteredCategories = CategoryData?.data && (CategoryData?.data as any[]).map((category: any) => ({
            label: category.name,
            value: category._id
        }));
        setFilteredCategory(filteredCategories);
        const CategoryValues = selectedCategoryValues?.map(category => category.value);
        AddProduct.setFieldValue("category", CategoryValues)
    }, [CategoryData, selectedCategoryValues])

    //brand select
    useEffect(() => {
        const filterBrands = BrandData?.data && (BrandData?.data as any[]).map((brand: any) => ({
            label: brand.name,
            value: brand._id
        }))
        setFilteredBrand(filterBrands)
        const values = selectedBrandValues?.value;
        AddProduct.setFieldValue("brand", values)
    }, [BrandData, selectedBrandValues])

    //form data submit
    const AddProduct = useFormik
        ({
            initialValues: {
                image: [],
                name: "",
                description: "",
                stock: "",
                category: [],
                brand: "",
                price: "",
                productModel: "",
                warranty: "",
                dummyPrice: "",
                thumbnail: "",
                isActive: isActive
            },

            validationSchema: Yup.object().shape({
                category: Yup.array().min(1, STRING.PRODUCT_CATEGORY_REQUIRED),
                name: Yup.string().trim().required(STRING.PRODUCT_NAME_REQUIRED).min(3, STRING.PRODUCT_NAME_FORMAT),
                description: Yup.string().trim().required(STRING.PRODUCT_DESC_REQUIRED),
                stock: Yup.string().trim().required(STRING.PRODUCT_STOCK_REQUIRED),
                brand: Yup.string().trim().required(STRING.PRODUCT_BRAND_REQUIRED),
                price: Yup.string().trim().required(STRING.PRODUCT_PRICE_REQUIRED),
                productModel: Yup.string().trim().required(STRING.PRODUCT_MODEL_REQUIRED),
                warranty: Yup.string().trim().required(STRING.PRODUCT_WARRANTY__REQUIRED),
                dummyPrice: Yup.string().required(STRING.PRODUCT_DUMMYPRICE__REQUIRED),
                thumbnail: Yup.mixed().required(STRING.PRODUCT_THUMNAIL_REQUIRED),
                // .test("fileFormat", STRING.PRODUCT_THUMNAIL_FORMAT, (value: any) => {
                //     if (value) {
                //         const acceptedFormats = ["image/png"].includes(value.type);
                //         const isStringValuePng = typeof value === 'string' && value.endsWith(".png");
                //         return acceptedFormats || isStringValuePng;
                //     }
                //     return true;
                // }),
                image: Yup.array().min(1, STRING.PRODUCT_IMAGE_REQUIRED).max(4, STRING.PRODUCT_MAXIMU_IMAGE),
                // .test("fileFormat", STRING.IMAGE_FORMATES, (value: any) => {
                //     if (value && value?.length > 0) {
                //         const acceptedFormats = ["image/svg+xml", "image/png", "image/jpeg", "image/jpg"];
                //         const isValidFormat = value.every((file: any) => {
                //             return acceptedFormats.includes(file.type);
                //         });

                //         const accepteDefaltFormats = value.every((file: any) => {
                //             const accepteDefaltFormats = typeof file === 'string' && file.endsWith(".png") ||
                //                 typeof file === 'string' && file.endsWith(".jpeg") ||
                //                 typeof file === 'string' && file.endsWith(".jpg") ||
                //                 typeof file === 'string' && file.endsWith(".svg");
                //             return acceptedFormats.includes(file.type) || accepteDefaltFormats;
                //         });
                //         return isValidFormat || accepteDefaltFormats;
                //     }
                //     return true;
                // }),
            }),

            onSubmit: async (values: any) => {
                values.id = ProductId;
                values.stock = Number(values.stock);
                values.isActive = isActive;
                const response: any = await EditProduct(values);
                const { message, statusCode } = response?.data;
                if (statusCode === 200) {
                    toast.success(message);
                    navigate("/product")
                } else {
                    toast.error(message || response?.error?.data?.message);
                }
            },
        });

    const Category = () => {
        navigate("/product")
    }

    return (
        <>
            <div className='flex gap-[15px] items-center mt-[1rem] add_category'>
                <IconButton className='!bg-main !text-white' onClick={Category}>
                    <ArrowBackIcon className='!text-[20px]' />
                </IconButton>
                <Typography component='p' className='!font-bold !text-[25px]'>
                    {STRING.PRODUCT_EDIT}
                </Typography>
            </div>

            <form onSubmit={AddProduct.handleSubmit} className='add_product'>
                <Paper className='mt-[1.5rem]  paperboxshadow p-[1rem]'>
                    <div className='flex justify-end'>
                        {isLoading ? (<Loader />) : (<Buttons type={"submit"} className={'product_add_button'} startIcon={<BookmarkIcon />} variant={'contained'} text={STRING.SAVE} />)}
                    </div>
                    <div className='flex !flex-col mt-[1rem] pl-[3rem] pr-[3rem]'>

                        <div className='flex item-center !gap-[15px]'>

                            <div className='w-[11rem] !flex !justify-end mt-[0.5rem] '>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.PRODUCT_IMAGE}
                                </Typography>
                            </div>
                            {/* {imagePreviews?.map((preview, index) => (
                                <div key={index} className="image-preview-container">

                                    <div className='flex'>
                                        <Avatar
                                            className='!w-[120px] !h-[120px] !cursor-pointer !rounded-[10px] !bg-white  border-[1px] !border-header'
                                            src={preview}
                                            // src={`${BASE_URL}/${imagePreviews} `}
                                            alt={`Image Preview ${index + 1}`} />
                                        <div className='close_icon'>
                                            <IconButton disableRipple onClick={() => removeImage(index)}>
                                                <CloseIcon className='!text-[20px]' />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            ))} */}
                            {imagePreviews?.map((preview, index) => {
                                // const imageUrl = preview?.startsWith("data") ? preview : `${preview}`;
                                return (
                                    <div key={index} className="image-preview-container">
                                        <div className='flex'>
                                            <Avatar
                                                className='!w-[120px] !h-[120px] !cursor-pointer !rounded-[10px] !bg-white  border-[1px] !border-header'
                                                // src={`${BASE_URL}/${preview}`}
                                                src={preview}
                                                alt={`Image Preview ${index + 1}`} />
                                            <div className='close_icon'>
                                                <IconButton disableRipple onClick={() => removeImage(index)}>
                                                    <CloseIcon className='!text-[20px]' />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                            <TextFields
                                type={'file'}
                                name={'image'}
                                onChange={handleFileChange}
                                id={'fileInput'}
                                accept={'image/*'}
                                multiple={true}
                                style={{ display: 'none' }}
                                values={AddProduct.values.image} />

                            {(imagePreviews?.length < 4) && (
                                <Avatar onClick={AddCategoryImg}
                                    className='!w-[120px] !h-[120px] !cursor-pointer !rounded-[10px] !bg-white  border-[1px] !border-header'
                                    alt='Image Preview'>
                                    <CloudUploadIcon className='!text-[3rem] !text-header' />
                                </Avatar>
                            )}
                            <div className='flex items-end' >
                                {AddProduct.touched.image && AddProduct.errors.image && (
                                    <Typography variant='caption' className='!font-bold ' color='error'>
                                        {AddProduct.errors.image.toString()}
                                    </Typography>
                                )}
                            </div>
                        </div>

                        <div className='flex item-center !gap-[15px] mt-[1rem]'>
                            <div className='w-[11rem] !flex !justify-end mt-[0.5rem] '>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.PRODUCT_THUMBNAIL}
                                </Typography>
                            </div>

                            <TextFields
                                name={"thumbnail"}
                                values={AddProduct.values.thumbnail}
                                onChange={handleThumbnailChanges}
                                id={'fileInput2'}
                                type={'file'}
                                accept={'image/png'}
                                style={{ display: 'none' }} />
                            <div className='flex-col'>
                                <Avatar
                                    className='!w-[120px] !h-[120px] !cursor-pointer !rounded-[10px] !bg-white  border-[1px] !border-header'
                                    src={thumbnailimagePreview === null ? `${thumbnailImage} ` : `${thumbnailimagePreview}`}
                                    onClick={AddThumbnailImage}
                                    alt='Image Preview'>
                                    <CloudUploadIcon className='!text-[3rem] !text-header' />
                                </Avatar>
                            </div>
                            <div className='flex items-end' >
                                {AddProduct.touched.thumbnail && AddProduct.errors.thumbnail && (
                                    <Typography variant='caption' className='!font-bold ' color='error'>
                                        {AddProduct.errors.thumbnail.toString()}
                                    </Typography>
                                )}
                            </div>
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.PRODUCT_CATEGORY}
                                </Typography>
                            </div>
                            <div className='flex-col w-[100%]'>
                                <Selects selectedValues={selectedCategoryValues} setSelectedValues={setSelectedCategoryValues} placeholder={STRING.PRODUCT_CATEGORY_PLACHOLDER} height={"45px"} options={filteredCategory} isMulti={true} />
                                {AddProduct.touched.category && AddProduct.errors.category && (
                                    <Typography variant='caption' className='!font-bold !ml-[1rem]' color='error'>
                                        {AddProduct.errors.category.toString()}
                                    </Typography>
                                )}
                            </div>
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold '>
                                    {STRING.PRODUCT_BRAND}
                                </Typography>
                            </div>
                            <div className='flex-col w-[100%]'>
                                <Selects options={filteredBrand} selectedValues={selectedBrandValues} setSelectedValues={setSelectedBrandValues} placeholder={STRING.PRODUCT_BRAND_PLACHOLDER} height={"45px"} />
                                {(AddProduct.submitCount > 0 && AddProduct.errors.brand) && (
                                    <Typography variant='caption' className='!font-bold !ml-[1rem]' color='error'>
                                        {AddProduct.errors.brand.toString()}
                                    </Typography>
                                )}
                            </div>
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.PRODUCT_NAME}
                                </Typography>
                            </div>
                            <TextFields
                                helperText={AddProduct.touched.name && AddProduct.errors.name} onChange={AddProduct.handleChange} value={AddProduct.values.name} autoComplete={'off'} placeholder={STRING.PRODUCT_NAME_PLACHOLDER}
                                name={"name"} className={'productField'} />
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.PRODUCT_MODEL}
                                </Typography>
                            </div>

                            <TextFields
                                helperText={AddProduct.touched.productModel && AddProduct.errors.productModel} onChange={AddProduct.handleChange} value={AddProduct.values.productModel} autoComplete={'off'} placeholder={STRING.PRODUCT_MODEL_PLACHOLDER}
                                name={"productModel"} className={'productField'} />
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem] textareas'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.PRODUCT_DESC}
                                </Typography>
                            </div>
                            <Textareas
                                helperText={AddProduct.touched.description && AddProduct.errors.description} onChange={AddProduct.handleChange} value={AddProduct.values.description} name={"description"} rows={3} placeholder={STRING.PRODUCT_DESC_PLACHOLDER} />
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.PRODUCT_STOCK}
                                </Typography>
                            </div>
                            <TextFields type={"number"}
                                helperText={AddProduct.touched.stock && AddProduct.errors.stock} onChange={AddProduct.handleChange} value={AddProduct.values.stock} autoComplete={'off'} placeholder={STRING.PRODUCT_STOCK_PLACHOLDER}
                                name={"stock"} className={'productField'} />
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.PRODUCT_PRICE}
                                </Typography>
                            </div>

                            <TextFields type={"number"}
                                helperText={AddProduct.touched.price && AddProduct.errors.price} onChange={AddProduct.handleChange} value={AddProduct.values.price} autoComplete={'off'} placeholder={STRING.PRODUCT_PRICE_PLACHOLDER}
                                name={"price"} className={'productField'} />
                        </div>


                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.PRODUCT_DUMMY_PRICE}
                                </Typography>
                            </div>

                            <TextFields type={"number"}
                                helperText={AddProduct.touched.dummyPrice && AddProduct.errors.dummyPrice} onChange={AddProduct.handleChange} value={AddProduct.values.dummyPrice} autoComplete={'off'} placeholder={STRING.PRODUCT_DUMMYPRICE_PLACHOLDER}
                                name={"dummyPrice"} className={'productField'} />
                        </div>
                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.PRODUCT_WARRANTY}
                                </Typography>
                            </div>

                            <TextFields
                                helperText={AddProduct.touched.warranty && AddProduct.errors.warranty} onChange={AddProduct.handleChange} value={AddProduct.values.warranty} autoComplete={'off'} placeholder={STRING.PRODUCT_WARRANTY_PLACHOLDER}
                                name={"warranty"} className={'productField'} />
                        </div>

                        <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
                            <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                                <Typography component='span' className='!font-bold'>
                                    {STRING.PRODUCT_ACTIVE}
                                </Typography>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginTop: "0.5rem", width: "100%" }}>
                                <Switchs isActive={isActive} setIsActive={setIsActive} />
                            </div>
                        </div>
                    </div>
                </Paper>
            </form>
        </>
    );
}



// const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     console.log(files, "filesss");
//     if (files) {
//         Array.from(files).forEach((file: File) => {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setImagePreviews((prevPreviews) => [...prevPreviews, reader.result as string]);
//                 setProductImages((prevImages) => [...prevImages, file]);
//                 AddProduct.setFieldValue('image', [...AddProduct.values.image, file]);
//             };
//             reader.readAsDataURL(file);
//         });
//     }
// };