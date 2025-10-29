import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../components/common/AppBar";
import { DrawerHeader, Main } from "../../components/common/PageComonComponent/index";
import Drawers from "../../components/common/Drawer";
import ProductPage from "../../components/Product";

export default function Product() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars  haddings="Product" />
      <Drawers />
      <Main open={true} >
        <DrawerHeader />
        <ProductPage/>
      </Main>
    </Box>
  )
}
