import React from 'react'
import { useEffect, useState } from 'react'
import "./style.scss"
import { Paper } from '@mui/material';
import Buttons from '../common/Buttons';
import IosShareIcon from '@mui/icons-material/IosShare';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Search from '../common/Search/index';
import { STRING } from '../../constants/String';
import Tables from '../common/Table';
import { useDeleteCategoryMutation } from '../../api/Category';
import Dialogs from '../common/Dialogs';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Selects from '../common/Selects';
import { exportToCsv } from '../../constants/Helper/Csv';
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from '../../api/Orders';
import UpdateOrderStatusDialog from './UpdateOrderStatusDialog';


export default function OrderPage() {

    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [search, setsearch] = useState("");
    const [status, setStatus] = useState<any>("");
    const [method, setMethod] = useState<any>("");

    const { data: OrdersData, isFetching, refetch } = useGetAllOrdersQuery({});
    const [rows, setRows] = useState<any[]>([]);
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState([]);
    const [selectedDeleteRows, setSelectedDelteRows] = useState([]);

    const [input, setinput] = useState("");
    const [openDeleteConfirmation, setDeleteOpenConfirmation] = useState(false);

    const [UpdateOrderStatus, { isLoading: UpdateStatusLoading }] = useUpdateOrderStatusMutation();

    useEffect(() => {
        setRows([])
        refetch()
    }, [refetch])

    const statusOption = [
        { value: "Pending", label: "Pending" },
        { value: "Completed", label: "Completed" },
        { value: "Shipped", label: "Shipped" },
        { value: "Out of Delivery", label: "Out of Delivery" },
        { value: "Delivered", label: "Delivered" },
        { value: "Cancelled", label: "Cancelled" },
    ]

    const MethodOption = [
        { value: "online", label: "Online" },
        { value: "cod", label: "Cash On Delivery" },
    ]

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
            id: 'orderId',
            numeric: true,
            disablePadding: true,
            label: 'Order ID',
        },
        {
            id: 'email',
            numeric: false,
            disablePadding: true,
            label: 'Email',
        },
        {
            id: 'createdAt',
            numeric: true,
            disablePadding: true,
            label: 'Create on',
        },
        {
            id: 'paymentAmount',
            numeric: true,
            disablePadding: true,
            label: 'PaymentAmount',
        },
        {
            id: 'status',
            numeric: true,
            disablePadding: false,
            label: 'Status',
        },
        {
            id: 'action',
            numeric: true,
            disablePadding: false,
            // label: 'Action',
        },
    ];

    function createData(
        orderId: string | number,
        email: any,
        createdAt: any,
        paymentAmount: any,
        status: any,
        shippingAddress: any,
        products: any,
        data: any,
        id: any


    ): any {
        return {
            orderId: orderId,
            email: email,
            createdAt: createdAt,
            paymentAmount: paymentAmount,
            status: status,
            shippingAddress: shippingAddress,
            products: products,
            data: data,
            id: id
        };
    }

    useEffect(() => {
        const OrderDatas = OrdersData?.data;

        setOrderData(OrderDatas)
        const rowise = OrderDatas?.map((item: any) => {

            console.log(item, "itemitem")
            return createData(
                item.orderId,
                item.user.email,
                item.createdAt,
                item.paymentAmount,
                item.status,
                item.address,
                item.products,
                item,
                item?._id
            );
        });
        setRows(rowise)
    }, [OrdersData])


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



    const handleCvsExport = () => {
        const exportColumns = [
            { id: 'orderId', label: 'Order ID' },
            { id: 'email', label: 'Email' },
            { id: 'createdAt', label: 'Create on' },
            { id: 'paymentAmount', label: 'PaymentAmount' },
            { id: 'status', label: 'Status' },
        ];
        exportToCsv(rows, exportColumns, 'order_data');
    }

    //edit status 
    const [UpdateselectedId, setUpdateSelectedId] = useState<any>("");
    const [selectStatus, setSelectStatus] = useState<any>("");
    const [openUpdateConfirmationSingle, setUpdateOpenConfirmationSingle] = useState(false);
    const [optionValue, setOptionValue] = useState<any>("")

    const handleUpdateOpenConfirmation = (row: any) => {

        console.log(row, "rowrow")
        setUpdateOpenConfirmationSingle(true);
        setUpdateSelectedId(row?.id);
        setSelectStatus({ label: row?.status, value: row?.status })
        setOptionValue({ label: row?.status, value: row?.status })
    };
    const handleUpdateCloseConfirmations = () => {
        setUpdateOpenConfirmationSingle(false);
        setSelectedIdSingle([])
        setSelectStatus("")
    };



    const handleUpdateOrderStatus = async () => {
        const body = {
            orderId: UpdateselectedId,
            status: selectStatus.value,
        };

        const response: any = await UpdateOrderStatus(body);
        const { message, statusCode } = response?.data;
        if (statusCode === 200) {
            toast.success(message);
        } else {
            toast.error(message);
        }
        response && handleUpdateCloseConfirmations();
    };


    return (
        <div className='productContainer'>
            <Paper className='paperboxshadow h-[83px] flex justify-between items-center p-[1rem] mt-[0.5rem]'>
                <div className='productbtns flex justify-between'>
                    <div className='flex gap-[10px] items-center'>
                        <Buttons onClick={handleCvsExport} startIcon={<IosShareIcon />} text={STRING.EXPORT_BUTTON} variant={"outlined"} className={"productheaderbtn1"} />
                        <div className='h-[25px] rounded-[5px]  bg-secondary'>
                            {rows && rows?.length > 0 ? (<span className='text-[14px]  p-[0.5rem] text-main '>{`(${rows?.length.toString().padStart(2, '0')}) Order Available`}</span>) : (null)}
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
                </div>
            </Paper>


            {/* <Paper className='paperboxshadow h-[83px] mt-[0.8rem] flex  items-center p-[1rem] gap-[10px]'>
<Search setinput={setinput}
    input={input}
    setsearch={setsearch} placeholder={STRING.ORDER__SEARCH_PLACHOLDER} />
<Selects selectedValues={method} setSelectedValues={setMethod} width={"250px"} height={"45px"} options={MethodOption} placeholder={"Method"} />
<Selects selectedValues={status} setSelectedValues={setStatus} width={"250px"} height={"45px"} options={statusOption} placeholder={"Status"} />
</Paper> */}


            <div className='mt-[1rem]'>
                <Tables handleUpdateOpenConfirmation={handleUpdateOpenConfirmation} handleDeleteOpen={handleDeleteSingleOpenConfirmation} selected={selected} setSelected={setSelected} Orders={"Orders"} getSelectedDeleteRows={getSelectedDeleteRows} headCells={headCells} rows={rows} isFetching={isFetching} />
            </div>


            {/* update status */}
            <UpdateOrderStatusDialog loading={UpdateStatusLoading} selectedValues={selectStatus} setSelectedValues={setSelectStatus} tital={"Update Order Status"} textClose={"Cancel"} textYes={"Edit"} yesClass={"dialog_yes"} closeClass={"dialog_cancel"} open={openUpdateConfirmationSingle} onClose={handleUpdateCloseConfirmations} optionValue={optionValue} Action={handleUpdateOrderStatus} />
        </div>
    )
}

