import React from "react";
import { Button } from "../Button/Button";
import { Container } from "@mui/material";
import Input, { InputAdornment } from "../Input/Input";
import SearchIcon from "@mui/icons-material/Search";
import { useSetRecoilState } from "recoil";
import { searchAtom } from "../../shared/atoms";
import styled from "@emotion/styled";
import { useWindowScroll } from "react-use";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

function Header() {
   const btnProps = {
      className: "btn btn-link rounded-pill nav-link font-weight-bolder",
      isPrimary: true,
   };

   const setSearch = useSetRecoilState(searchAtom);

   const { y } = useWindowScroll();

   const Nav = styled.nav`
      position: fixed;
      z-index: 15;
      width: 100%;
      border-bottom-width: 1px;
      padding: 1rem 0px;
   `;

   return (
      <Nav className={`navbar fixed bg-white pt-2 pb-2 ${y > 0 ? "shadow" : "shadow-none"}`}>
         <Container className="justify-content-between" maxWidth="lg" sx={{ display: "flex" }}>
            <Link to={"/"}>
               <div className="d-flex align-middle">
                  <img src={logo} alt="Logo" height={50} width={50} />
                  <span
                     className="ml-1 font-weight-bold"
                     style={{ color: "#163a50", fontSize: "1.8rem" }}
                  >
                     Jubelio
                  </span>
               </div>
            </Link>
            <Input
               className={"mx-4"}
               style={{ width: "100%" }}
               onChange={(e) => setSearch(e.target.value)}
               placeholder="Cari baju...."
               endAdornment={
                  <InputAdornment>
                     <SearchIcon />
                  </InputAdornment>
               }
            />
            <Button {...btnProps}>
               <Badge badgeContent={4} color="info">
                  <ShoppingCartIcon color="disabled" />
               </Badge>
            </Button>
         </Container>
      </Nav>
   );
}

export default Header;
