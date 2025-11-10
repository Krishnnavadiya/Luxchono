import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../components/common/AppBar";
import { DrawerHeader, Main } from "../../components/common/PageComonComponent/index";
import Drawers from "../../components/common/Drawer";
import OrderPage from "../../components/Order";

export default function Order() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars  haddings="Order" />
      <Drawers />
      <Main open={true}>
        <DrawerHeader />
        <OrderPage/>
      </Main>
    </Box>
  )
}


