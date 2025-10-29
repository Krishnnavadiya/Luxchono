import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider } from '@mui/material'
import logo from "../../../assets/Images/logo.svg";
import { useLocation, useNavigate } from 'react-router';
import { createTheme } from '@mui/material/styles';
import { DrawerHeader } from '../../../components/common/PageComonComponent/index';
import "./style.scss"
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonIcon from '@mui/icons-material/Person';
import QueueIcon from '@mui/icons-material/Queue';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { STRING } from '../../../constants/String';
import { useState } from 'react';
import Dialogs from '../Dialogs';
export default function Drawers() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = createTheme();
    const Navigate = (path: string) => {
        navigate(path)
    }

    const [openConfirmation, setOpenConfirmation] = useState(false);

    const handleOpenConfirmation = () => {
        setOpenConfirmation(true);
    };
    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("lw-token")
        localStorage.removeItem("lw-username")
        navigate('/login');
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Drawer
                    sx={{
                        width: 280,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 280,
                            boxSizing: 'border-box',
                            boxShadow: "#e8e8eb 1px 1px 10px 1px"
                        }
                    }}
                    variant="persistent"
                    anchor="left"
                    open={true}>
                    <DrawerHeader className='!flex !justify-center mt-[0.9rem]'  >
                        <img src={logo} alt="logo"></img>
                    </DrawerHeader>
                    <List className='!mt-[1rem] !p-[0.5rem]' >
                        <ListItem disablePadding onClick={() => Navigate("/dashboard")} className={`draewr_dashboard_item ${location.pathname === "/dashboard" ? "active" : ""}`}  >
                            <ListItemButton component="a" disableRipple>
                                <ListItemIcon className='draewr_dashboard_icon'  >
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText className='draewr_dashboard_text' primary="Dashboard" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding onClick={() => Navigate("/product")} className={`draewr_dashboard_item ${location.pathname === "/product" || location.pathname === "/addproduct" || location.pathname === "/editproduct" ? "active" : ""}`}   >
                            <ListItemButton component="a" disableRipple >
                                <ListItemIcon className='draewr_dashboard_icon'>
                                    <ProductionQuantityLimitsIcon />
                                </ListItemIcon>
                                <ListItemText className='draewr_dashboard_text' primary="Product" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding onClick={() => Navigate("/order")} className={`draewr_dashboard_item ${location.pathname === "/order" || location.pathname === "/vieworder" ? "active" : ""}`}>
                            <ListItemButton component="a" disableRipple >
                                <ListItemIcon className='draewr_dashboard_icon'>
                                    <QueueIcon />
                                </ListItemIcon>
                                <ListItemText className='draewr_dashboard_text' primary="Order" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding onClick={() => Navigate("/category")} className={`draewr_dashboard_item ${location.pathname === "/category" || location.pathname === "/addcategory" || location.pathname === "/editcategory" ? "active" : ""}`} >
                            <ListItemButton component="a" disableRipple >
                                <ListItemIcon className='draewr_dashboard_icon'>
                                    <CategoryIcon />
                                </ListItemIcon>
                                <ListItemText className='draewr_dashboard_text' primary="Category" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding onClick={() => Navigate("/brand")} className={`draewr_dashboard_item ${location.pathname === "/brand" || location.pathname === "/addbrand" || location.pathname === "/editbrand" ? "active" : ""}`} >
                            <ListItemButton component="a" disableRipple >
                                <ListItemIcon className='draewr_dashboard_icon'>
                                    <MarkChatReadIcon />
                                </ListItemIcon>
                                <ListItemText className='draewr_dashboard_text' primary="Brand" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding onClick={() => Navigate("/customer")} className={`draewr_dashboard_item ${location.pathname === "/customer" ? "active" : ""}`} >
                            <ListItemButton component="a" disableRipple >
                                <ListItemIcon className='draewr_dashboard_icon'>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText className='draewr_dashboard_text' primary="Customer" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding onClick={() => Navigate("/offer")} className={`draewr_dashboard_item ${location.pathname === "/offer" || location.pathname === "/addoffer" || location.pathname === "/editoffer" || location.pathname === "/viewoffer" ? "active" : ""}`} >
                            <ListItemButton component="a" disableRipple >
                                <ListItemIcon className='draewr_dashboard_icon'>
                                    <LocalOfferIcon />
                                </ListItemIcon>
                                <ListItemText className='draewr_dashboard_text' primary="Offer" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding onClick={() => Navigate("/profile")} className={`draewr_dashboard_item ${location.pathname === "/profile" ? "active" : ""}`} >
                            <ListItemButton component="a" disableRipple >
                                <ListItemIcon className='draewr_dashboard_icon'>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText className='draewr_dashboard_text' primary="Profile" />
                            </ListItemButton>
                        </ListItem>
                    </List>

                    <div >
                        <div className="logout_icon_div" onClick={handleOpenConfirmation}>

                            <div className="logout_icon_div2">
                                <div >
                                    <LogoutIcon className='logout_icon' />
                                </div>
                                <span className='logout_text' >
                                    {STRING.LOGOUT}
                                </span>
                            </div>

                        </div>
                    </div>


                </Drawer>

            </ThemeProvider>
            <Dialogs textClose={STRING.DIALOG_CANCEL_BUTTON} textYes={STRING.DIALOG_YES_BUTTON} yesClass={"logout_dialog_yes"} closeClass={"logout_dialog_cancel"} icon={<NewReleasesIcon className='text-main !text-[4rem] !mb-[-15px]' />} open={openConfirmation} onClose={handleCloseConfirmation} tital={STRING.DIALOG_TITAL} text={STRING.DIALOG_DESC} Action={handleLogout} />
        </>

    )
}
