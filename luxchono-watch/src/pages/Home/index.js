import React from "react";
import DrawerAppBar from "../../components/AppBar";
import HomePage from "../../components/HomePage";
import { Box, Toolbar } from "@mui/material";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div>
      <DrawerAppBar />
      <Box component="main" >
        <HomePage />
        <Footer />
      </Box>
    </div>
  );
}
