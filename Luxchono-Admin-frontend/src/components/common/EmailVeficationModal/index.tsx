import { Box, Dialog, DialogContent, Modal, Typography } from '@mui/material'
import React from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import "./style.scss"
import Buttons from '../Buttons';
import { STRING } from '../../../constants/String';
export default function EmailVeficationModal({ openConfirmation, handleCloseConfirmation, action }: any) {

    return (
        <div>
            <Dialog open={openConfirmation}
                onClose={handleCloseConfirmation}
                className='email_dialog'>
                <DialogContent>
                    <Box>
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", textAlign: "center", marginTop: "-0.5rem", padding: "1rem" }}>
                            <div>
                                <TaskAltIcon sx={{ fontSize: "90px", color: "green" }} />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", fontWeight: "700", fontSize: "20px", marginTop: "0.5rem" }}>
                                <span>{STRING.EMAIL_VERFIY_MESSAGE}</span>
                            </div>
                            <Buttons onClick={action} text={STRING.CHECK_MAIL_BOX} variant={"contained"} className={"VerifyButton"} />
                        </div>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    )
}
