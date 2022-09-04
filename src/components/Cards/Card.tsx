/* eslint-disable react/jsx-pascal-case */
import React from "react";
import styled from "@emotion/styled";
import Card$1 from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Rupiah } from "../../shared/helpers";

const ContainerCard = styled.div`
   display: flex;
   height: 100%;
   max-width: 100%;
   padding: 0px 8px 25px;
   box-sizing: border-box;
   margin: 10px 20px;
   cursor: pointer;
`;

const WrapperCard = styled(Card$1)`
   display: flex;
   position: static;
   overflow: visible;
   background-color: var(--N0, #ffffff);
   flex-flow: column nowrap;
   height: 100%;
`;

const Card$2 = styled.div`
   display: flex;
   flex-direction: column;
   -webkit-box-pack: justify;
   justify-content: space-between;
   height: 100%;
   box-shadow: rgb(0 0 0 / 12%) 0px 1px 6px 0px;
   border-radius: 9px;
   overflow: hidden;
   padding: 0px;
   margin: 0px;
   position: relative;
   min-width: 100%;
`;
const Media: any = styled(CardMedia)`
   display: block;
   object-fit: cover;
   object-position: center center;
   width: 100%;
   height: 100%;
   margin: 0px auto;
`;
const Title = styled.div`
   font-size: 1.4rem;
   font-weight: 500;
   line-height: 1.5;
   max-width: 100%;
   max-height: 100%;
   white-space: pre-wrap;
   word-break: keep-all;
   text-overflow: ellipsis;
   overflow: hidden;
   margin-bottom: 4px;
   display: -webkit-box;
   -webkit-line-clamp: 1;
   -webkit-box-orient: vertical;
`;

interface Props {
   data: any;
}

const Card = React.forwardRef((props: Props, ref: any) => {
   const { data } = props;

   const body = (
      <Card$2>
         <WrapperCard>
            <Media
               onError={(e: any) =>
                  (e.target.src = "https://jubelio.com/wp-content/uploads/2020/03/01-1.png")
               }
               component="img"
               height="140"
               image={
                  data.prdImage01
                     ? data.prdImage01
                     : "https://jubelio.com/wp-content/uploads/2020/03/01-1.png"
               }
               alt="green iguana"
            />
            <CardContent>
               <Title>{data.prdNm}</Title>
               <Typography variant="subtitle1" color="#212121">
                  {Rupiah(data.selPrc)}
               </Typography>
               {Object.keys(data?.sellerPrdCd).length > 0 && (
                  <Chip label={data.sellerPrdCd} color="success" />
               )}
            </CardContent>
         </WrapperCard>
      </Card$2>
   );

   return ref ? (
      <ContainerCard ref={ref} className="productlist">
         {body}
      </ContainerCard>
   ) : (
      <ContainerCard className="productlist">{body}</ContainerCard>
   );
});

export default Card;
