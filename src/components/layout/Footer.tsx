import { Button } from "../Button/Button";
import { Container } from "@mui/material";

export default function Footer() {
   const btnProps = {
      className: "nav-link ",
      type: "link",
      isExternal: true,
      href: "https://github.com/ilhamhanif07",
   };

   return (
      <footer className="bg-white">
         <Container maxWidth="lg">
            <div className="footer rounded-top  font-weight-bolder py-2 px-5">
               <Button {...btnProps}>
                  Github - Ilham Hanif <small>(Jubelio - Elevenia API)</small>
               </Button>
            </div>
         </Container>
      </footer>
   );
}
