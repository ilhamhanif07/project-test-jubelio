import React from "react";
import { Button } from "../Button/Button";
import { Container } from "@mui/material";

function Header() {
   const btnProps = {
      className: "btn btn-primary btn-sm rounded-pill nav-link py-1 px-4 font-weight-bolder",
      isPrimary: true,
      type: "link",
      href: "/",
   };
   return (
      <Container maxWidth="lg">
         <div className="navbar rounded-bottom bg-white pt-2 pb-2">
            <Button {...btnProps}>Home</Button>
         </div>
      </Container>
   );
}

export default Header;
