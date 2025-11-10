import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../components/common/AppBar";
import { DrawerHeader, Main } from "../../components/common/PageComonComponent/index";
import Drawers from "../../components/common/Drawer";
import OfferPage from "../../components/Offer";


export default function Offer() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars haddings="Offer" />
      <Drawers />
      <Main open={true}>
        <DrawerHeader />
        <OfferPage />
      </Main>
    </Box>
  )
}
