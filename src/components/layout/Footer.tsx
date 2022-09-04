import { Button } from "../Button/Button";
import { Container } from "@mui/material";

export default function Footer() {
   const btnProps = {
      className: "nav-link ",
      type: "link",
      isExternal: true,
      href: "https://github.com/",
   };

   return (
      <Container maxWidth="lg" sx={{ flexGrow: 0, flexShrink: 0, flexBasis: "auto" }}>
         <div className="footer rounded-top bg-white font-weight-bolder py-2 px-5">
            <Button {...btnProps}>
               Github - Ilham Hanif <small>(Jubelio - Elevenia API)</small>
            </Button>
         </div>
      </Container>
   );
}
