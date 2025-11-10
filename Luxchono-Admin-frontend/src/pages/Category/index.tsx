import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../components/common/AppBar";
import { DrawerHeader, Main } from "../../components/common/PageComonComponent/index";
import Drawers from "../../components/common/Drawer";
import CategoryPage from "../../components/Category";

export default function Category() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars haddings="Category" />
      <Drawers />
      <Main open={true}>
        <DrawerHeader />
        <CategoryPage />
      </Main>
    </Box>
  )
}