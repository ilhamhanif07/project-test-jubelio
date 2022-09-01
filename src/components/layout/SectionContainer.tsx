import React from "react";
import Container from "@mui/material/Container";

const SectionContainer = (props: any) => {
   return (
      <>
         <Container maxWidth="lg" sx={{ flexGrow: 1, flexShrink: 0, flexBasis: "auto" }}>
            {props.children}
         </Container>
      </>
   );
};

export default SectionContainer;
