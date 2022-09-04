import React from "react";
import { Button } from "../Button/Button";
import { Container } from "@mui/material";
import Input, { InputAdornment } from "../Input/Input";
import SearchIcon from "@mui/icons-material/Search";
import { useSetRecoilState } from "recoil";
import { searchAtom } from "../../shared/atoms";

function Header() {
   const btnProps = {
      className: "btn btn-primary btn-sm rounded-pill nav-link py-1 px-4 font-weight-bolder",
      isPrimary: true,
      type: "link",
      href: "/",
   };

   const setSearch = useSetRecoilState(searchAtom);

   return (
      <Container maxWidth="lg">
         <div className="navbar rounded-bottom bg-white pt-2 pb-2">
            <Button {...btnProps}>Home</Button>
            <Input
               style={{ width: "300px" }}
               onChange={(e) => setSearch(e.target.value)}
               endAdornment={
                  <InputAdornment>
                     <SearchIcon />
                  </InputAdornment>
               }
            />
         </div>
      </Container>
   );
}

export default Header;
