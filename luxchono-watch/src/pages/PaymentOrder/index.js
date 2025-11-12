import React from "react";
import DrawerAppBar from "../../components/AppBar";
import { Box } from "@mui/material";
import Footer from "../../components/Footer";
import PaymentOrderPage from "../../components/PaymentOrderPage";

export default function PaymentOrder() {
    return (
        <div>
            <DrawerAppBar />
            <Box component="main" >
                <PaymentOrderPage />
                <Footer />
            </Box>
        </div>
    );
}
