/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
import ModalBody from "../../components/Modal/ModalBody";
import ModalHeader from "../../components/Modal/ModalHeader";
import { Typography, Box, Divider } from "@mui/material";
import Carousel$1 from "../../components/Carousel/Carousel";
import { initArray, Rupiah } from "../../shared/helpers";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button } from "../../components/Button/Button";
import _isEmpty from "lodash/isEmpty";
import Input from "../../components/Input/Input";

interface Props {
   children?: any;
   data: any;
   setShowModalDetail: (arg: boolean) => void;
}

export default function ModalDetailProduct(props: Props) {
   const { data, setShowModalDetail } = props;

   const ImageList = initArray(data);

   console.log(data?.sellerPrdCd);

   return (
      <React.Fragment>
         <ModalHeader onClose={() => setShowModalDetail(false)}>{data.prdNm}</ModalHeader>
         <ModalBody className="d-flex flex-row">
            <Box maxWidth="sm">
               <Carousel$1 data={ImageList} name={data.prdNm} />
            </Box>
            <Box maxWidth="sm">
               <div className="d-flex my-1">
                  <Typography mr={1} variant="body1" color="#8C8C8C">
                     Product No : {data.prdNo}
                  </Typography>
                  <Typography mr={1} variant="body1" color="#8C8C8C">
                     SKU : {_isEmpty(data?.sellerPrdCd) ? "-" : data?.sellerPrdCd}
                  </Typography>
               </div>
               <Divider />
               <div className="d-flex flex-column my-1">
                  <Typography variant="h6" color="#595959">
                     Detail Product
                  </Typography>
                  <div
                     style={{ color: "#434343" }}
                     dangerouslySetInnerHTML={{ __html: data.htmlDetail.replace(/\n/g, "<br />") }}
                  />
               </div>
               <Divider />
               <div className="d-flex flex-column my-1">
                  <Typography variant="h4" color="#595959">
                     {Rupiah(data.selPrc)}
                  </Typography>
               </div>
            </Box>
         </ModalBody>
      </React.Fragment>
   );
}
