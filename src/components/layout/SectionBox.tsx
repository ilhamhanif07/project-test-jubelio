import React from "react";
import { Box, Toolbar } from "@mui/material";
import SectionContainer from "./SectionContainer";
import Footer from "./Footer";
import Header from "./Header";

function SectionBox(props: any) {
   return (
      <>
         <Box
            sx={{
               backgroundColor: "grey",
               flexGrow: 1,
               height: "100vh",
               overflow: "auto",
               display: "flex",
               flexDirection: "column",
               minHeight: "100vh",
            }}
         >
            <Header />

            <SectionContainer>{props.children}</SectionContainer>

            <Footer />
         </Box>
      </>
   );
}

export default SectionBox;
