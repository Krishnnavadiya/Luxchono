import { Box, CssBaseline } from "@mui/material";
import AppBars from "../../components/common/AppBar";
import { DrawerHeader, Main } from "../../components/common/PageComonComponent/index";
import Drawers from "../../components/common/Drawer";
import CategoryPage from "../../components/Category";
import ProfilePage from "../../components/Profile";

export default function Profile() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBars haddings="Profile" />
      <Drawers />
      <Main open={true}>
        <DrawerHeader />
        <ProfilePage />
      </Main>
    </Box>
  )
}