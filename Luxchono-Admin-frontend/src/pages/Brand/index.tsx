import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../components/common/AppBar";
import { DrawerHeader, Main } from "../../components/common/PageComonComponent/index";
import Drawers from "../../components/common/Drawer";
import BrandPage from "../../components/Brand";

export default function Brand() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars  haddings="Brand" />
      <Drawers />
      <Main open={true}>
        <DrawerHeader />
        <BrandPage/>
      </Main>
    </Box>
  )
}
