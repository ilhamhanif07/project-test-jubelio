import styled from "@emotion/styled";
import Close from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import React from "react";

const Header = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin: 0;
   font-size: 18px;
   font-family: "Roboto", "Helvetica", "Arial", sans-serif;
   font-weight: 500;
   letter-spacing: 0.0075em;
   padding: 16px;
   -webkit-flex: 0 0 auto;
   -ms-flex: 0 0 auto;
   flex: 0 0 auto;
   border: 0;
   outline: 0;
   border-bottom: 1px solid #d9d9d9;
`;

interface Props {
   children?: any;
   onClose?: () => void;
}

const ModalHeader = (props: Props) => {
   const { children, onClose } = props;
   return (
      <>
         <Header>
            {children}
            {onClose && (
               <IconButton onClick={onClose}>
                  <Close color="error" />
               </IconButton>
            )}
         </Header>
      </>
   );
};

export default ModalHeader;
