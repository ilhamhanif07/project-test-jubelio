import React from "react";
import { Outlet } from "react-router-dom";
import SectionBox from "./SectionBox";

function Layout() {
   return (
      <SectionBox>
         <Outlet />
      </SectionBox>
   );
}

export default Layout;
