import React from "react";
import DrawerAppBar from "../../components/AppBar";

import { Box, Toolbar } from "@mui/material";
import Footer from "../../components/Footer";
import ProductDetailsPage from "../../components/ProductDetailsPage";
import PrivacyPolicyPage from "../../components/PrivacyPolicyPage";

export default function PrivacyPolicy() {
    return (
        <div>
            <DrawerAppBar />
            <Box component="main" >
                <PrivacyPolicyPage />
                <Footer />
            </Box>
        </div>
    );
}
