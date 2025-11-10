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
import { useAddCategoryMutation } from '../../../api/Category';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader';
import { STRING } from '../../../constants/String';

export default function AddCategoryPage() {

  const [imagePreview, setImagePreview] = useState<any>(null);
  const [iconPreview, setIconPrerview] = useState<any>(null);

  const [AddCategoryData, { isLoading }] = useAddCategoryMutation();
  const navigate = useNavigate();

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      AddCategory.setFieldValue("image", file)
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
      AddCategory.setFieldValue("icon", file)
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

  const AddCategory = useFormik({
    initialValues: {
      name: '',
      image: '',
      icon: "",
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().trim().required(STRING.CATEGORY_NAME_REQUIRED).min(3, STRING.CATEGORY_NAME_FORMAT),
      image: Yup.mixed().required(STRING.CATEGORY_NAME_IMAGE)
        .test("fileFormat", STRING.IMAGE_FORMATES, (value: any) => {
          if (value) {
            const acceptedFormats = ["image/svg+xml", "image/png", "image/jpeg", "image/jpg"].includes(value.type);
            return acceptedFormats;
          }
          return true;
        }),


      icon: Yup.mixed().required(STRING.CATEGORY_ICON_REQUIRED).test("fileFormat", STRING.IMAGE_FORMATES, (value: any) => {
        if (value) {
          const acceptedFormats = ["image/svg+xml", "image/png", "image/jpeg", "image/jpg"].includes(value.type);
          return acceptedFormats;
        }
        return true;
      }),

    }),

    onSubmit: async (values: any) => {
      const response: any = await AddCategoryData(values);
      const { message, statusCode } = response?.data;
      if (statusCode === 200) {
        toast.success(message);
        navigate("/category")
      } else {
        toast.error(message);
      }
    },
  });

  const Category = () => {
    navigate("/category")
  }

  return (
    <>
      <div className='flex gap-[15px] items-center mt-[1rem] add_category'>
        <IconButton className='!bg-main !text-white' onClick={Category}>
          <ArrowBackIcon className='!text-[20px]' />
        </IconButton>
        <Typography component='p' className='!font-bold !text-[25px]'>
          {STRING.CATEGORYADD}
        </Typography>
      </div>

      <form onSubmit={AddCategory.handleSubmit}>
        <Paper className='mt-[1.5rem] p-[1rem] pb-[2rem] paperboxshadow'>
          <div className='flex justify-end'>
            {isLoading ? (<Loader />) : (<Buttons type={"submit"} className={'category_add_button'} startIcon={<BookmarkIcon />} variant={'contained'} text={'Save'} />)}
          </div>
          <div className='flex !flex-col mt-[1rem] pl-[3rem] pr-[3rem] '>
            <div className='flex item-center !gap-[15px]'  >

              <div className='w-[11rem] !flex !justify-end mt-[0.5rem] '>
                <Typography component='span' className='!font-bold'>
                  {STRING.CATEGORY_IMAGE}
                </Typography>
              </div>

              {/* <TextFields name={"image"} values={AddCategory.values.image} onChange={handleFileChange} id={'fileInput'} type={'file'} style={{ display: 'none' }} /> */}
              <TextFields
                name={"image"}
                values={AddCategory.values.image}
                onChange={handleFileChange}
                id={'fileInput'}
                type={'file'}
                accept={'image/*'} // This will allow only image files
                style={{ display: 'none' }} />

              <div className='flex-col'>
                <Avatar
                  className='!w-[120px] !h-[120px] !cursor-pointer !rounded-[10px] !bg-white  border-[1px] !border-header'
                  src={imagePreview}
                  onClick={AddCategoryImg}
                  alt='Image Preview'>
                  <CloudUploadIcon className='!text-[3rem] !text-header' />
                </Avatar>
                <label className='ml-[1rem]'>
                  {AddCategory.touched.image && AddCategory.errors.image && (
                    <Typography variant='caption' className='!font-bold ' color='error'>
                      {AddCategory.errors.image.toString()}
                    </Typography>
                  )}
                </label>
              </div>
            </div>

            <div className='flex item-center !gap-[15px] mt-[1rem]  ' >

              <div className='w-[11rem] !flex !justify-end mt-[0.5rem]'>
                <Typography component='span' className='!font-bold'>
                  {STRING.ICON}
                </Typography>
              </div>

              {/* <TextFields name={"image"} values={AddCategory.values.image} onChange={handleFileChange} id={'fileInput'} type={'file'} style={{ display: 'none' }} /> */}
              <TextFields
                name={"icon"}
                values={AddCategory.values.icon}
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
                  {AddCategory.touched.icon && AddCategory.errors.icon && (
                    <Typography variant='caption' className='!font-bold ' color='error'>
                      {AddCategory.errors.icon.toString()}
                    </Typography>
                  )}
                </label>
              </div>
            </div>

            <div className='!flex !item-center  !gap-[15px] mt-[1rem]'>
              <div className='w-[12rem] flex justify-end  mt-[0.5rem]'>
                <Typography component='span' className='!font-bold'>
                  {STRING.CATEGORY_NAME}
                </Typography>
              </div>

              <TextFields autoComplete={'off'} placeholder={STRING.CATEGORY_NAME_PLACHOLDER} values={AddCategory.values.name}
                onChange={AddCategory.handleChange}
                helperText={AddCategory.touched.name && AddCategory.errors.name} name={"name"} className={'categoryField'} />
            </div>
          </div>
        </Paper>
      </form>
    </>
  );
}
