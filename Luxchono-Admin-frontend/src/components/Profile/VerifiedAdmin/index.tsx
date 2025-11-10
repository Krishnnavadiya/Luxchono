import React, { useEffect, useState } from 'react'
import "./style.scss"
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import Dialogs from '../../common/Dialogs';
import { STRING } from '../../../constants/String';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useAdminVerifiedMutation, useGetAllAdminQuery } from '../../../api/Login';
import { toast } from 'react-toastify';
import Loader from '../../common/Loader';

export default function VerifiedAdmin() {

    const { data: AdminData, isFetching: AdminFetching, refetch } = useGetAllAdminQuery({
        search: "",
    });

    const [unverifyAdmin, setUnverifyAdmin] = useState<any[]>([])

    const [AdminVerified, { isLoading }] = useAdminVerifiedMutation();

    console.log(unverifyAdmin,"unverifyAdmin")


    useEffect(() => {
        const data = (AdminData as any)?.data?.filter((item: any) => {
            return item?.isAdminVerified === false
        })

        setUnverifyAdmin(data);
    }, [AdminData])

    const [openConfirmation, setOpenConfirmation] = useState(false);

    const [AdminId, setAdminId] = useState()

    const handleOpenConfirmation = (item: any) => {

        console.log(item, "items")
        setAdminId(item?._id)
        setOpenConfirmation(true);
    };
    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
    };

    const handleVerify = async () => {
        try {
            const response: any = await AdminVerified(AdminId);

            console.log(response, "responseee")
            const { message, statusCode } = response?.data;
            if (statusCode === 200) {
                toast.success(message);
                handleCloseConfirmation();
            } else {
                toast.error(message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='mains_div'>


            {!AdminFetching ? ((unverifyAdmin?.length !== 0 && unverifyAdmin !== undefined)  ? (
                unverifyAdmin?.map((items) => {

                    return (
                        <>
                            <div className='box_div'>
                                <div className='containe'>
                                    <div>
                                        <PersonIcon className='icon' />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <div>
                                            <span className='containe_title'>{items?.email}</span>
                                        </div>
                                        <div>
                                            <span className='containe_title2'>{items?.username}</span>
                                        </div>
                                    </div>
                                </div>

                                <div onClick={() => handleOpenConfirmation(items)}>
                                    <CheckCircleOutlinedIcon className='right_icon' />
                                </div>
                            </div>
                        </>
                    )

                })

            ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "70vh" }}>
                    <span style={{ fontWeight: "600", fontSize: "16px" }}>{"No data available"}</span>
                </div>
            )) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "70vh" }}>
                    <Loader />
                </div>

            )}

            <Dialogs loading={isLoading} textClose={STRING.DIALOG_CANCEL_BUTTON} textYes={STRING.DIALOG_YES_BUTTON} yesClass={"logout_dialog_yes"} closeClass={"logout_dialog_cancel"} icon={<TaskAltIcon className='text-main !text-[4rem] !mb-[-15px]' />} open={openConfirmation} onClose={handleCloseConfirmation} text={STRING.VERIFY_ADMIB} Action={handleVerify} />

        </div>
    )
}
