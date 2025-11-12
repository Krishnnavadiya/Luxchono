import React from "react";
import DrawerAppBar from "../../components/AppBar";

import { Box, Toolbar } from "@mui/material";
import Footer from "../../components/Footer";
import ProductDetailsPage from "../../components/ProductDetailsPage";

export default function ProductDetails() {
    return (
        <div>
            <DrawerAppBar />
            <Box component="main" >
                <ProductDetailsPage />
                <Footer />
            </Box>
        </div>
    );
}
