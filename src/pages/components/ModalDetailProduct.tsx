/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
import ModalBody from "../../components/Modal/ModalBody";
import ModalHeader from "../../components/Modal/ModalHeader";
import { Typography, Box } from "@mui/material";
import Carousel$1 from "../../components/Carousel/Carousel";
import { initArray } from "../../shared/helpers";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Props {
   children?: any;
   data: any;
   setShowModalDetail: (arg: boolean) => void;
}

export default function ModalDetailProduct(props: Props) {
   const { data, setShowModalDetail } = props;

   const ImageList = initArray(data);

   return (
      <React.Fragment>
         <ModalHeader onClose={() => setShowModalDetail(false)}> {data.prdNm}</ModalHeader>
         <ModalBody>
            <Box>
               <Carousel$1 data={ImageList} name={data.prdNm} />
            </Box>
            <div>
               <Typography variant="h6" color="#262626">
                  Detail Product
               </Typography>
               <div
                  dangerouslySetInnerHTML={{ __html: data.htmlDetail.replace(/\n/g, "<br />") }}
               />
            </div>
         </ModalBody>
      </React.Fragment>
   );
}
