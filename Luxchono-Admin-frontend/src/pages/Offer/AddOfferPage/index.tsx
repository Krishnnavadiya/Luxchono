import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../../components/common/AppBar/index";
import { DrawerHeader, Main } from "../../../components/common/PageComonComponent/index";
import Drawers from "../../../components/common/Drawer";
import AddOfferPage from "../../../components/Offer/AddOfferPage";


export default function AddOffer() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBars haddings="Offer" />
            <Drawers />
            <Main open={true}  >
                <DrawerHeader />
                <AddOfferPage />
            </Main>
        </Box>
    )
}