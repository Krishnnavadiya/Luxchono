import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../../components/common/AppBar/index";
import { DrawerHeader, Main } from "../../../components/common/PageComonComponent/index";
import Drawers from "../../../components/common/Drawer";
import AddproductPage from "../../../components/Product/AddProductPage";


export default function AddProduct() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBars haddings="Product" />
            <Drawers />
            <Main open={true}  >
                <DrawerHeader />
                <AddproductPage />
            </Main>
        </Box>
    )
}