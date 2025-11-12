import React from "react";
import DrawerAppBar from "../../components/AppBar";
import { Box} from "@mui/material";
import Footer from "../../components/Footer";
import ProductsPage from "../../components/ProductsPage";

export default function Products() {
    return (
        <div>
            <DrawerAppBar />
            <Box component="main" >
                <ProductsPage />
                <Footer />
            </Box>
        </div>
    );
}
