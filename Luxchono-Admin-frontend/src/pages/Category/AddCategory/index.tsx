import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../../components/common/AppBar/index";
import { DrawerHeader, Main } from "../../../components/common/PageComonComponent/index";
import Drawers from "../../../components/common/Drawer";
import AddCategoryPage from "../../../components/Category/AddCategoryPage";

export default function AddCategory() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars haddings="Category" />
      <Drawers />
      <Main open={true}  >
        <DrawerHeader />
        <AddCategoryPage />
      </Main>
    </Box>
  )
}