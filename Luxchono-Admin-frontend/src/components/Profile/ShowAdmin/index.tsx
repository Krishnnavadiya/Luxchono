import React from 'react'
import { useEffect, useState } from 'react'
import "./style.scss"
import { Paper } from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useNavigate } from 'react-router-dom';
import { useGetAllAdminQuery } from '../../../api/Login';
import Buttons from '../../common/Buttons';
import { STRING } from '../../../constants/String';
import Searchs from '../../common/Search';
import Tables from '../../common/Table';
import { exportToCsv } from '../../../constants/Helper/Csv';

export default function ShowAdmin() {

    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [search, setsearch] = useState("");

    const { data: AdminData, isFetching: AdminFetching, refetch } = useGetAllAdminQuery({
        search: search.trim(),
    });

    console.log(AdminData, "AdminDataAdminData")

    const [rows, setRows] = useState<any[]>([]);
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState<any>([]);
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
            id: 'username',
            numeric: false,
            disablePadding: true,
            label: 'User Name',
        },
        {
            id: 'email',
            numeric: false,
            disablePadding: true,
            label: 'Email',
        },
        {
            id: 'isAdminVerified',
            numeric: false,
            disablePadding: true,
            label: 'Verified',
        },

    ];

    function createData(
        id: string | number,
        username: any,
        email: any,
        isAdminVerified: any
    ): any {
        return {
            id: id,
            username: username,
            email: email,
            isAdminVerified: isAdminVerified
        };
    }

    useEffect(() => {
        const adminData = (AdminData as any)?.data; // Type assertion to any
        setAdminData(adminData);
        const rowise = adminData?.map((item: any) => {
            return createData(
                item._id,
                item.username,
                item.email,
                item.isAdminVerified
            );
        });
        setRows(rowise);
    }, [AdminData]);



    useEffect(() => {
        refetch()
    }, [search, refetch])

    //delete single category

    const handleCvsExport = () => {
        const exportColumns = [
            { id: 'username', label: 'User Name' },
            { id: 'email', label: 'Email' },
            { id: 'isAdminVerified', label: 'Verified' },
        ];
        exportToCsv(rows, exportColumns, 'admin_data');
    }

    return (
        <div className='AdminContainer'>
            <Paper className='paperboxshadow h-[83px] flex justify-between items-center p-[1rem] mt-[0.5rem]'>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <div className='flex gap-[18px] items-center'>
                        <Buttons onClick={handleCvsExport} startIcon={<IosShareIcon />} text={STRING.EXPORT_BUTTON} variant={"outlined"} className={"productheaderbtn1"} />
                        <div className='h-[25px] rounded-[5px]  bg-secondary '>
                            {rows && rows?.length > 0 ? (<span className='text-[14px]  p-[0.5rem] text-main '>{`(${rows?.length.toString().padStart(2, '0')})  Admin Available`}</span>) : (null)}
                        </div>
                    </div>
                    {/* <div >
                        <Searchs setinput={setinput}
                            input={input}
                            setsearch={setsearch} placeholder={"Search Admin"} />
                    </div> */}
                </div>
            </Paper>

            <div className='mt-[1rem]'>
                <Tables selected={selected} setSelected={setSelected} Admin={"admin"} getSelectedDeleteRows={getSelectedDeleteRows} headCells={headCells} rows={rows} isFetching={AdminFetching} />
            </div>

        </div>
    )
}
