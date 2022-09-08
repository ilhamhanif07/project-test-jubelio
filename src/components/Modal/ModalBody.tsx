import styled from "@emotion/styled";
import React from "react";

const Body = styled.div`
   width: 100%;
   height: 100%;
   padding: 16px;
   display: -webkit-box;
   display: -webkit-flex;
   display: -ms-flexbox;
   display: flex;
   -webkit-flex-direction: row;
   -ms-flex-direction: row;
   flex-direction: column;
   /* -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center; */
   background-color: #fff;
   overflow: auto;
   gap: 2rem;
`;

interface Props {
   children?: any;
   className?: any;
}

const ModalBody = ({ children, ...props }: Props) => {
   return <Body {...props}>{children}</Body>;
};

export default ModalBody;
