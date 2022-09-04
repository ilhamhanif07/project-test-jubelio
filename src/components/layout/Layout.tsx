import React, { ReactNode } from "react";

import SectionBox from "./SectionBox";

interface Props {
   children: ReactNode;
}

function Layout({ children }: Props) {
   return <SectionBox>{children}</SectionBox>;
}

export default Layout;
