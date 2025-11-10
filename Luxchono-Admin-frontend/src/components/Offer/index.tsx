import React from 'react'
import { useEffect, useState } from 'react'
import "./style.scss"
import { Icon, Paper } from '@mui/material';
import Buttons from '../common/Buttons';
import IosShareIcon from '@mui/icons-material/IosShare';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Search from '../common/Search/index';
import { STRING } from '../../constants/String';
import Tables from '../common/Table';
import Dialogs from '../common/Dialogs';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDeleteOfferMutation, useGetAllOfferQuery } from '../../api/Offer';
import { exportToCsv } from '../../constants/Helper/Csv';

export default function OfferPage() {
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [search, setsearch] = useState("");
    const [DeleteOffer, { isLoading: deleteOfferLoading }] = useDeleteOfferMutation();
    const { data: OfferData, isFetching: OfferFetching, refetch } = useGetAllOfferQuery({ search: search.trim() })
    const [rows, setRows] = useState<any[]>([]);
    const navigate = useNavigate();

    const [OfferDatas, setOfferDatas] = useState([]);

    const [selectedDeleteRows, setSelectedDelteRows] = useState([]);


    const [input, setinput] = useState("");

    const getSelectedDeleteRows = (rows: any) => {
        setSelectedDelteRows(rows)
    }

    const [openDeleteConfirmation, setDeleteOpenConfirmation] = useState(false);

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
            label: 'Offer Name',
        },
        {
            id: 'offer',
            numeric: true,
            disablePadding: false,
            label: 'Discount',
        },
        {
            id: 'productName',
            numeric: true,
            disablePadding: false,
            label: 'Product Name',
        },
        {
            id: 'action',
            numeric: true,
            disablePadding: false,
            // label: 'Action',
        },
    ];

    function createData(
        id: any,
        name: any,
        offer: any,
        image: any,
        description: any,
        products: any,
        startDate: any,
        endDate: any,
        defaultProducts: any,
        productName: any

    ): any {
        return {
            id: id,
            name: name,
            offer: offer,
            image: image,
            description: description,
            products: products,
            startDate: startDate,
            endDate: endDate,
            defaultProducts: defaultProducts,
            productName: productName

        };
    }

    useEffect(() => {
        const OfferDatas = OfferData?.data;
        setOfferDatas(OfferDatas)
        console.log(OfferDatas, "OfferDatasOfferDatas")
        const rowise = OfferDatas?.map((item: any) => {

            const defaultProducts = {
                label: item.product.name,
                value: item.product._id,
            };

            console.log(item, "defaultProducts")
            return createData(
                item._id,
                item.name,
                item.product.offer,
                item.image,
                item.description,
                item.product._id,
                item.startDate,
                item.endDate,
                defaultProducts,
                item.product.name

            );
        });
        setRows(rowise)
    }, [OfferData])

    useEffect(() => {
        refetch()
    }, [search, refetch])



    const handleDelete = async () => {
        const response: any = await DeleteOffer({ id: selectedDeleteRows })
        const { message, statusCode } = response?.data;
        if (statusCode === 200) {
            toast.success(message)
            setSelected([])

        } else {
            toast.error(message)
        }
        response && handleDeleteCloseConfirmation()
    }

    const AddOffer = () => {
        navigate("/addoffer")
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
        const response: any = await DeleteOffer({ id: selectedIdSingle })
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
            { id: 'name', label: 'Offer Name' },
            { id: 'offer', label: 'Discount' },
            { id: 'productName', label: 'product Name' },
        ];
        exportToCsv(rows, exportColumns, 'offer_data');
    }

    return (

        <div className='offerContainer'>
            <Paper className='paperboxshadow h-[83px] flex justify-between items-center p-[1rem] mt-[0.5rem]'>
                <div className='productbtns flex justify-between'>
                    <div className='flex gap-[10px]'>
                        <Buttons onClick={handleCvsExport} startIcon={<IosShareIcon />} text={STRING.EXPORT_BUTTON} variant={"outlined"} className={"productheaderbtn1"} />
                        {/* <Buttons startIcon={<SystemUpdateAltIcon />} variant={"outlined"} text={"Import"} className={"productheaderbtn1"} /> */}
                    </div>
                </div>
                <div className='flex gap-[10px]'>
                    {(selected.length > 0 && rows?.length > 0) && <Buttons onClick={handleDeleteOpenConfirmation} startIcon={<DeleteOutlineIcon />} variant={"contained"} text={
                        selectedDeleteRows.length === 0
                            ? `${STRING.DELETE_BUTTON}`
                            : `${STRING.DELETE_BUTTON} ( ${selectedDeleteRows.length} )`
                    } className={`productheaderbtn2 ${selectedDeleteRows.length > 0 ? '!w-[135px]' : ''
                        }`} />}
                    <Buttons onClick={AddOffer} startIcon={<ControlPointIcon />} variant={"contained"} text={"Add Offer"} className="productheaderbtn2 addbtn" />
                </div>
            </Paper>

            {/* <Paper className='paperboxshadow h-[83px] mt-[0.8rem] flex  items-center p-[1rem] gap-[10px]'>
                <Search setinput={setinput}
                    input={input}
                    setsearch={setsearch} placeholder={"Search Offer"} />
            </Paper> */}

            <div className='mt-[1rem]'>
                <Tables handleDeleteOpen={handleDeleteSingleOpenConfirmation} selected={selected} setSelected={setSelected} Offer={"Offer"} getSelectedDeleteRows={getSelectedDeleteRows} headCells={headCells} rows={rows} isFetching={OfferFetching} />
            </div>
            <Dialogs loading={deleteOfferLoading} textClose={STRING.DELETE_CLOSE_BUTTON} textYes={STRING.DELETE_YES_BUTTON} yesClass={"product_delete_yes"} closeClass={"product_delete_cancel"} icon={<DeleteIcon className='text-red !text-[4rem] !mb-[-15px]' />} open={openDeleteConfirmation} onClose={handleDeleteCloseConfirmation} tital={STRING.DELETE_SURE} desc={STRING.OFFER_DELETE_DESC} Action={handleDelete} />

            {/* single delete */}
            <Dialogs loading={deleteOfferLoading} textClose={STRING.DELETE_CLOSE_BUTTON} textYes={STRING.DELETE_YES_BUTTON} yesClass={"product_delete_yes"} closeClass={"product_delete_cancel"} tital={STRING.DELETE_SURE} desc={STRING.OFFER_DELETE_DESC} icon={<DeleteIcon className='text-red !text-[4rem] !mb-[-15px]' />} open={openDeleteConfirmationSingle} onClose={handleDeleteSingleCloseConfirmations} Action={handleDeleteSingle} />
        </div>
    )
}
