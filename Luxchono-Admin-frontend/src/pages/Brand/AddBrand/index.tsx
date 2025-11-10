import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../../components/common/AppBar/index";
import { DrawerHeader, Main } from "../../../components/common/PageComonComponent/index";
import Drawers from "../../../components/common/Drawer";
import AddBrandPage from "../../../components/Brand/AddBrandPage";

export default function AddBrand() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars haddings="Brand" />
      <Drawers />
      <Main open={true}  >
        <DrawerHeader />
        <AddBrandPage/>
      </Main>
    </Box>
  )
}