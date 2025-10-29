import { Avatar, Box, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { AppBar } from "./style"
import LogoutIcon from '@mui/icons-material/Logout';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { useNavigate } from 'react-router-dom';
import Dialogs from '../Dialogs';
import { STRING } from '../../../constants/String';


export default function AppBars(props: any) {
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const navigate = useNavigate();

    const userName = localStorage.getItem("lw-username")

    const handleOpenConfirmation = () => {
        setOpenConfirmation(true);
    };
    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("lw-token")
        navigate('/login');
    };

    return (
        <>
            <AppBar position="fixed" open={true} className="!bg-[white] !shadow-[1px_1px_10px_1px_#e8e8eb] pl-[2rem] p-[0.3rem]">
                <Toolbar className='flex items-center justify-between'>
                    <Box className="" >
                        <Typography noWrap component="p" className='text-black !font-bold !text-[20px]'>
                            {props.haddings}
                        </Typography>
                    </Box>
                    <Box className="!flex !items-center gap-[13px]">
                        <Avatar className='!bg-[#964315] !h-[35px] !w-[35px]' alt="user_img" src="" />
                        <Typography variant="h6" component="div" className="text-black !font-bold" >
                            {userName}
                        </Typography>
                        {/* <LogoutIcon onClick={handleOpenConfirmation} className='text-black cursor-pointer' /> */}
                    </Box>
                </Toolbar>
            </AppBar>
            <Dialogs textClose={STRING.DIALOG_CANCEL_BUTTON} textYes={STRING.DIALOG_YES_BUTTON} yesClass={"logout_dialog_yes"} closeClass={"logout_dialog_cancel"} icon={<NewReleasesIcon className='text-main !text-[4rem] !mb-[-15px]' />} open={openConfirmation} onClose={handleCloseConfirmation} tital={STRING.DIALOG_TITAL} text={STRING.DIALOG_DESC} Action={handleLogout} />
        </>
    )
}
