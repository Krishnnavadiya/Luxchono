import React from "react";
import DrawerAppBar from "../../components/AppBar";
import { Box } from "@mui/material";
import Footer from "../../components/Footer";
import ProductsPage from "../../components/ProductsPage";
import ProfilePage from "../../components/ProfilePage";

export default function Profile() {
    return (
        <div>
            <DrawerAppBar />
            <Box component="main" >
                <ProfilePage />
                <Footer />
            </Box>
        </div>
    );
}
