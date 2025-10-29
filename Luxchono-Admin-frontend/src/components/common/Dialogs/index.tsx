import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import Buttons from '../Buttons';
import "./style.scss"
import Loader from '../Loader';

export default function Dialogs({ open, onClose, tital, text, Action, loading, icon, yesClass, closeClass, textClose, textYes, desc }: any) {
    return (
        <Dialog className="dialog" open={open} >
            <Box className="dialog_wraper flex flex-col items-center !mt-[-18px]" >
                <DialogTitle >
                    <Box className="dialog_tital mt-[15px]">
                        <Box className="text-center">
                            {/* <NewReleasesIcon className="dialog_logout_icon text-main !text-[4rem] !mb-[-15px]" /> */}
                            {icon}
                        </Box>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box className="dialog_tital_txt text-center font-bold text-[20px] mb-[3px]">
                        <div>
                            {tital}
                        </div>
                        <div>
                            {desc}
                        </div>
                    </Box>
                    <DialogContentText className="dialog_info !font-bold ">
                        {text}
                    </DialogContentText>
                    <DialogContentText className="dialog_info !font-bold ">
                    </DialogContentText>
                </DialogContent>
                <DialogActions >
                    {loading ? <Loader /> : (
                        <Box className="dialog_button">
                            <Buttons variant={"outlined"} className={closeClass} onClick={onClose} text={textClose} />
                            <Buttons variant={"contained"} className={yesClass} onClick={Action} text={textYes} />
                        </Box>
                    )}
                </DialogActions>
            </Box>
        </Dialog>
    )
}
