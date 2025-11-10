import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../../components/common/AppBar/index";
import { DrawerHeader, Main } from "../../../components/common/PageComonComponent/index";
import Drawers from "../../../components/common/Drawer";
import EditCategoryPage from "../../../components/Category/EditCategoryPage";

export default function EditCategory() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBars haddings="Category" />
            <Drawers />
            <Main open={true}  >
                <DrawerHeader />
                <EditCategoryPage />
            </Main>
        </Box>
    )
}