import React from "react";
import { Box } from "@mui/material";
import SectionContainer from "./SectionContainer";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
   children: React.ReactNode;
}

function SectionBox({ children }: Props) {
   return (
      <>
         <Box
            sx={{
               backgroundColor: "grey",
               display: "flex",
               flexDirection: "column",
               minHeight: "100vh",
            }}
         >
            <Header />
            <SectionContainer>{children}</SectionContainer>
            <Footer />
         </Box>
      </>
   );
}

export default SectionBox;
