import TableCell from '@mui/material/TableCell';
import { Avatar, Rating, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../api/Utils';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import dayjs from 'dayjs';
import { handleStatusesBadge } from '../customBadge';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export const ProductRow = ({ row, index, handleDeleteOpen }: any) => {

    const navigate = useNavigate();
    const labelId = `enhanced-table-checkbox-${index}`;
    return (
        <>
            <TableCell
                width={"19%"}
                align="left"
                component="th"
                id={labelId}
                scope="row"
                padding="none">
                <div className='flex gap-[10px] items-center '>
                    <Avatar className='!h-[35px] !w-[35px] !rounded-[10px] !border-header  border-[1px]' alt="p" src={`${row?.thumbnail}`} />
                    <div>
                        {row?.name} {row?.isActive ? (<CheckIcon style={{ color: "green", fontSize: "13px" }} />) : (<CloseIcon style={{ color: "red", fontSize: "15px" }} />)}
                    </div>
                </div>
            </TableCell>
            <TableCell width={"13%"} align="left" padding="none">{`${row.category}`}</TableCell>
            <TableCell width={"11%"} align="left" padding="none">{row?.brand}</TableCell>
            <TableCell width={"10%"} align="left" padding="none">{`${row?.price?.toLocaleString('en-IN')} ₹` || "-"}</TableCell>
            <TableCell width={"10%"} align="left" padding="none">{row?.stock}</TableCell>
            {/* <TableCell align="left" padding="none">
                <Rating className='!text-main' name="read-only" precision={0.5} value={Number(row?.review) || 0} readOnly />
            </TableCell> */}
            <TableCell width={"10%"} align="left" padding="none">{row?.productModel}</TableCell>
            <TableCell width={"10%"} align="left" padding="none">{row?.warranty}</TableCell>
            <TableCell width={"10%"} align="left" padding="none">
                {row?.dummyPrice ? `${row.dummyPrice.toLocaleString('en-IN')} ₹` : "-"}
            </TableCell>
            <TableCell align="left" padding="none">
                <div className='flex gap-[5px]'>
                    <EditOutlinedIcon className='text-black' onClick={() => navigate("/editproduct", { state: row })} />
                    <DeleteOutlineOutlinedIcon className='text-black' onClick={() => handleDeleteOpen(row)} />
                </div>
            </TableCell>
        </>
    )
}

export const CategoryRow = ({ row, index, handleDeleteOpen }: any) => {
    const navigate = useNavigate();
    const labelId = `enhanced-table-checkbox-${index}`;
    return (
        <>
            <TableCell
                align="left"
                component="th"
                id={labelId}
                scope="row"
                padding="none">

                <div className='flex gap-[10px] items-center'>
                    <Avatar className='!h-[35px] !w-[35px] !rounded-[10px] !border-header  border-[1px]' alt="c" src={`${row?.image}`} />
                    {row?.name}
                </div>
            </TableCell>
            <TableCell className='w-[5rem]' align="left" padding="none">
                <div className='flex gap-[5px]'>
                    <EditOutlinedIcon className='text-black' onClick={() => navigate("/editcategory", { state: row })} />
                    <DeleteOutlineOutlinedIcon className='text-black' onClick={() => handleDeleteOpen(row)} />
                </div>
            </TableCell>
            {/* <Dialogs loading={isLoading} textClose={STRING.DELETE_CLOSE_BUTTON} textYes={STRING.DELETE_YES_BUTTON} yesClass={"product_delete_yes"} closeClass={"product_delete_cancel"} tital={STRING.DELETE_SURE} desc={STRING.CATEGORY_DELETE_DESC} icon={<DeleteIcon className='text-red !text-[4rem] !mb-[-15px]' />} open={openDelete} onClose={handleDeleteClose} Action={handleDelete} /> */}
        </>
    )
}


export const BrandRow = ({ row, index, handleDeleteOpen }: any) => {
    const navigate = useNavigate();
    const labelId = `enhanced-table-checkbox-${index}`;
    return (
        <>
            <TableCell
                align="left"
                component="th"
                id={labelId}
                scope="row"
                padding="none">
                <div className='flex gap-[10px] items-center'>
                    <Avatar className='!h-[35px] !w-[35px] !rounded-[10px] !border-header  border-[1px]' alt="c" src={`${row?.image}`} />
                    {row?.name}
                </div>
            </TableCell>
            <TableCell className='w-[5rem]' align="left" padding="none">
                <div className='flex gap-[5px]'>
                    <EditOutlinedIcon className='text-black' onClick={() => navigate("/editbrand", { state: row })} />
                    <DeleteOutlineOutlinedIcon className='text-black' onClick={() => handleDeleteOpen(row)} />
                </div>
            </TableCell>
        </>
    )
}

export const OrdersRow = ({ row, index, handleDeleteOpen, handleUpdateOpenConfirmation }: any) => {
    console.log(row, "rowwwwwww")
    const navigate = useNavigate();
    const handleStatusesText = (status: any) => {
        switch (status) {
            case "Pending":
                return "Pending";
            case "Cancelled":
                return "Cancelled";
            case "Completed":
                return "Completed";
            case "Shipped":
                return "Shipped";
            case "Out of Delivery":
                return "Out of Delivery";
            case "Delivered":
                return "Delivered";
            default:
                return "-";
        }
    };
    const formattedDate = dayjs(row?.createdAt).format('MMM DD, YYYY [at] hh:mm A')
    const labelId = `enhanced-table-checkbox-${index}`;
    return (
        <>
            <TableCell
                width={"20%"}
                align="left"
                component="th"
                id={labelId}
                scope="row"
                padding="none">
                <div className='flex'>
                    {row?.orderId}
                </div>
            </TableCell>
            <TableCell align="left" padding="none">{row.email}</TableCell>
            <TableCell align="left" padding="none">{formattedDate}</TableCell>
            <TableCell align="left" padding="none">{`${row?.paymentAmount?.toLocaleString('en-IN')} ₹`}</TableCell>
            <TableCell align="left" padding="none">
                {/* <span style={handleStatusesBadge(row?.status)} onClick={() => handleUpdateOpenConfirmation(row)}>
                    {handleStatusesText(row?.status)}
                </span> */}

                <div>
                    <span
                        style={handleStatusesBadge(row?.status)}
                        onClick={() => {

                            handleUpdateOpenConfirmation(row);

                        }}
                    >
                        {handleStatusesText(row?.status)}
                    </span>

                    {row?.status !== "Cancelled" && row?.status !== "Delivered" && <EditOutlinedIcon sx={{ fontSize: "17px", marginLeft: "0.3rem" }} className='text-black' onClick={() => handleUpdateOpenConfirmation(row)} />}
                </div>


            </TableCell>
            <TableCell align="left" padding="none">
                <div className='flex gap-[5px]'>
                    <RemoveRedEyeOutlinedIcon className='text-black !text-[22px]' onClick={() => navigate("/vieworder", { state: row?.data })} />
                    {/* <DeleteOutlineOutlinedIcon className='text-black' onClick={() => handleDeleteOpen(row)} /> */}
                </div>
            </TableCell>
        </>
    )
}


export const CustomerRow = ({ row, index }: any) => {
    const navigate = useNavigate();
    const labelId = `enhanced-table-checkbox-${index}`;
    return (
        <>
            <TableCell
                width={"33%"}
                align="left"
                component="th"
                id={labelId}
                scope="row"
                padding="none">
                <div className='flex gap-[10px] items-center'>
                    {row?.username || "-"}
                </div>
            </TableCell>
            <TableCell width={"33%"} align="left" padding="none">{row.email || "-"}</TableCell>
            <TableCell width={"33%"} align="left" padding="none">{row.phoneNo || "-"}</TableCell>

            {/* <TableCell className='w-[5rem]' align="left" padding="none">
                <div className='flex gap-[5px]'>
                    <EditOutlinedIcon className='text-black' onClick={() => navigate("/editbrand", { state: row })} />
                    <DeleteOutlineOutlinedIcon className='text-black' />
                </div>
            </TableCell> */}
        </>
    )
}



export const AdminRow = ({ row, index, }: any) => {

    return (
        <>
            <TableCell align="left" padding="none">{row.username || "-"}</TableCell>
            <TableCell align="left" padding="none">{row.email || "-"}</TableCell>
            <TableCell align="left" padding="none">
                {row.isAdminVerified ? <CheckOutlinedIcon style={{ color: "green" }} /> :
                    <CloseOutlinedIcon style={{ color: "red" }} />}</TableCell>
        </>
    )
}
  
export const RatingRow = ({ row, index, }: any) => {

    console.log(row, "341234564444")

    return (
        <>
            <TableCell align="left" padding="none">{row.productName || "-"}</TableCell>
            <TableCell align="left" padding="none">{row.email || "-"}</TableCell>
            <TableCell align="left" padding="none">{row.star || "-"}</TableCell>
            <TableCell align="left" padding="none">{row.description || "-"}</TableCell>
        </>
    )
}

export const OfferRow = ({ row, index, handleDeleteOpen }: any) => {
    const navigate = useNavigate();
    const labelId = `enhanced-table-checkbox-${index}`;

    console.log(row, "offerofferoffer")
    return (
        <>
            <TableCell
                width={"50%"}
                align="left"
                component="th"
                id={labelId}
                scope="row"
                padding="none">
                <div className='flex gap-[10px] items-center'>
                    <Avatar className='!h-[35px] !w-[35px] !rounded-[10px] !border-header  border-[1px]' alt="p" src={row?.image} />
                    {row?.name || "-"}
                </div>
            </TableCell>
            <TableCell width={"10%"} align="left" padding="none">
                {row?.offer}
            </TableCell>
            <TableCell width={"30%"} align="left" padding="none">
                {row?.productName}
            </TableCell>
            <TableCell width={"10%"} align="left" padding="none">
                <div className='flex gap-[5px]'>
                    <EditOutlinedIcon className='text-black' onClick={() => navigate("/editoffer", { state: row })} />
                    <RemoveRedEyeOutlinedIcon className='text-black !text-[22px]' onClick={() => navigate("/viewoffer", { state: row })} />
                    <DeleteOutlineOutlinedIcon className='text-black' onClick={() => handleDeleteOpen(row)} />
                </div>
            </TableCell>
        </>
    )
}