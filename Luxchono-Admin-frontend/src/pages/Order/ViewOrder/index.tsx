import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../../components/common/AppBar/index";
import { DrawerHeader, Main } from "../../../components/common/PageComonComponent/index";
import Drawers from "../../../components/common/Drawer";
import ViewOrderPage from "../../../components/Order/ViewOder/ViewOderPage";

export default function ViewOrder() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBars haddings="Order" />
            <Drawers />
            <Main open={true}  >
                <DrawerHeader />
                <ViewOrderPage />
            </Main>
        </Box>
    )
}