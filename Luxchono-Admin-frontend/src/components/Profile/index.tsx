import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'
import ChangePassword from './ChangePassword';
import VerifiedAdmin from './VerifiedAdmin';
import ShowAdmin from './ShowAdmin';
import Details from './Details';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    width?: string;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, width, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            style={{ width: width || "80%" }}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}
function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}
export default function ProfilePage() {

    const [value, setValue] = React.useState(2);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box
            sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",
            }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{
                    borderRight: 1,
                    borderColor: "divider",
                }}>
                <Tab
                    label={"Details"}
                    {...a11yProps(0)}
                    style={{ fontWeight: "600" }}
                />
                <Tab
                    label={"Change Password"}
                    {...a11yProps(1)}
                    style={{ fontWeight: "600" }}
                />
                <Tab
                    label={" Manage All Admin"}
                    {...a11yProps(0)}
                    style={{ fontWeight: "600" }}
                />
                <Tab
                    label={"Show All Admin"}
                    {...a11yProps(0)}
                    style={{ fontWeight: "600" }}
                />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Details />
            </TabPanel>
            <TabPanel value={value} index={1} >
                <ChangePassword />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <VerifiedAdmin />
            </TabPanel>
            <TabPanel value={value} index={3} width="85%">
                <ShowAdmin />
            </TabPanel>
        </Box>
    )
}
