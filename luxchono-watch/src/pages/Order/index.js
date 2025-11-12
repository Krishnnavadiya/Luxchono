import React from "react";
import DrawerAppBar from "../../components/AppBar";
import { Box} from "@mui/material";
import Footer from "../../components/Footer";
import ProfilePage from "../../components/ProfilePage";
import OrderPage from "../../components/OrderPage";

export default function Order() {
    return (
        <div>
            <DrawerAppBar />
            <Box component="main" >
                <OrderPage />
                <Footer />
            </Box>
        </div>
    );
}
