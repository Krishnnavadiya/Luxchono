import React from 'react'
import { useEffect, useState } from 'react'
import "./style.scss"
import { Paper } from '@mui/material';
import Buttons from '../common/Buttons';
import IosShareIcon from '@mui/icons-material/IosShare';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Search from '../common/Search/index';
import { STRING } from '../../constants/String';
import Tables from '../common/Table';
import { useDeleteCategoryMutation, useGetAllCategoryQuery } from '../../api/Category';
import Dialogs from '../common/Dialogs';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { exportToCsv } from '../../constants/Helper/Csv';



export default function CategoryPage() {

    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [search, setsearch] = useState("");
    const [DeleteCategory, { isLoading: deleteCategoryLoading }] = useDeleteCategoryMutation()
    const { data: CategoryData, isFetching: CategoryFetching, refetch } = useGetAllCategoryQuery({
        search: search.trim(),
    });
    const [rows, setRows] = useState<any[]>([]);
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState([]);
    const [selectedDeleteRows, setSelectedDelteRows] = useState([]);
    const [input, setinput] = useState("");
    const [openDeleteConfirmation, setDeleteOpenConfirmation] = useState(false);

    const getSelectedDeleteRows = (rows: any) => {
        setSelectedDelteRows(rows)
    }

    const handleDeleteOpenConfirmation = () => {
        setDeleteOpenConfirmation(true);
    };

    const handleDeleteCloseConfirmation = () => {
        setDeleteOpenConfirmation(false);
        setSelected([])
    };

    const headCells: any[] = [
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Category name',
        },
        {
            id: 'action',
            numeric: true,
            disablePadding: false,
            // label: 'Action',
        },
    ];

    function createData(
        id: string | number,
        name: any,
        image: any,
        icon: any
    ): any {
        return {
            id: id,
            name: name,
            image: image,
            icon: icon
        };
    }

    useEffect(() => {
        const categoryData = CategoryData?.data;
        setCategoryData(categoryData)
        const rowise = categoryData?.map((item: any) => {
            return createData(
                item._id,
                item.name,
                item.image,
                item.icon
            );
        });
        setRows(rowise)
    }, [CategoryData])

    useEffect(() => {
        refetch()
    }, [search, refetch])

    const handleDelete = async () => {
        const response: any = await DeleteCategory({ id: selectedDeleteRows })
        const { message, statusCode } = response?.data;
        if (statusCode === 200) {
            toast.success(message)
            setSelected([])

        } else {
            toast.error(message)
        }
        response && handleDeleteCloseConfirmation()
    }

    const AddCategory = () => {
        navigate("/addcategory")
    }

    //delete single category
    const [selectedIdSingle, setSelectedIdSingle] = useState<number[]>([])

    const [openDeleteConfirmationSingle, setDeleteOpenConfirmationSingle] = useState(false);

    const handleDeleteSingleOpenConfirmation = (row: any) => {
        setDeleteOpenConfirmationSingle(true);
        setSelectedIdSingle([row?.id]);

    };

    const handleDeleteSingleCloseConfirmations = () => {
        setDeleteOpenConfirmationSingle(false);
        setSelectedIdSingle([])
    };

    const handleDeleteSingle = async () => {
        const response: any = await DeleteCategory({ id: selectedIdSingle })
        const { message, statusCode } = response?.data;
        if (statusCode === 200) {
            toast.success(message)

        } else {
            toast.error(message)
        }
        response && handleDeleteSingleCloseConfirmations()
    }

    const handleCvsExport = () => {
        const exportColumns = [
            { id: 'name', label: 'Category Name' },
        ];
        exportToCsv(rows, exportColumns, 'category_data');
    }

    return (
        <div className='productContainer'>
            <Paper className='paperboxshadow h-[83px] flex justify-between items-center p-[1rem] mt-[0.5rem]'>
                <div className='productbtns flex justify-between'>
                    <div className='flex gap-[18px] items-center'>
                        <Buttons onClick={handleCvsExport} startIcon={<IosShareIcon />} text={STRING.EXPORT_BUTTON} variant={"outlined"} className={"productheaderbtn1"} />
                        <div className='h-[25px] rounded-[5px]  bg-secondary '>
                            {rows && rows?.length > 0 ? (<span className='text-[14px]  p-[0.5rem] text-main '>{`(${rows?.length.toString().padStart(2, '0')}) Category Available`}</span>) : (null)}
                        </div>

                    </div>
                </div>
                <div className='flex gap-[10px]'>
                    {(selected.length > 0 && rows?.length > 0) && <Buttons onClick={handleDeleteOpenConfirmation} startIcon={<DeleteOutlineIcon />} variant={"contained"} text={
                        selectedDeleteRows.length === 0
                            ? `${STRING.DELETE_BUTTON}`
                            : `${STRING.DELETE_BUTTON} ( ${selectedDeleteRows.length} )`
                    } className={`productheaderbtn2 ${selectedDeleteRows.length > 0 ? '!w-[135px]' : ''
                        }`} />}
                    <Buttons onClick={AddCategory} startIcon={<ControlPointIcon />} variant={"contained"} text={STRING.CATEGORYADD} className="productheaderbtn2 addbtn" />
                </div>
            </Paper>

            <Paper className='paperboxshadow h-[83px] mt-[0.8rem] flex  items-center p-[1rem] gap-[10px]'>
                <Search setinput={setinput}
                    input={input}
                    setsearch={setsearch} placeholder={STRING.CATEGORY_SEARCH_PLACHOLDER} />
            </Paper>

            <div className='mt-[1rem]'>
                <Tables handleDeleteOpen={handleDeleteSingleOpenConfirmation} selected={selected} setSelected={setSelected} Category={"Category"} getSelectedDeleteRows={getSelectedDeleteRows} headCells={headCells} rows={rows} isFetching={CategoryFetching} />
            </div>
            <Dialogs loading={deleteCategoryLoading} textClose={STRING.DELETE_CLOSE_BUTTON} textYes={STRING.DELETE_YES_BUTTON} yesClass={"product_delete_yes"} closeClass={"product_delete_cancel"} icon={<DeleteIcon className='text-red !text-[4rem] !mb-[-15px]' />} open={openDeleteConfirmation} onClose={handleDeleteCloseConfirmation} tital={STRING.DELETE_SURE} desc={STRING.CATEGORY_DELETE_DESC} Action={handleDelete} />

            {/* single delete */}
            <Dialogs loading={deleteCategoryLoading} textClose={STRING.DELETE_CLOSE_BUTTON} textYes={STRING.DELETE_YES_BUTTON} yesClass={"product_delete_yes"} closeClass={"product_delete_cancel"} tital={STRING.DELETE_SURE} desc={STRING.CATEGORY_DELETE_DESC} icon={<DeleteIcon className='text-red !text-[4rem] !mb-[-15px]' />} open={openDeleteConfirmationSingle} onClose={handleDeleteSingleCloseConfirmations} Action={handleDeleteSingle} />
        </div>
    )
}
