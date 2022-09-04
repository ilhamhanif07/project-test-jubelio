import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useGetListProduct } from "../shared/hooks/useGetListProduct";
import styled from "@emotion/styled";
import useLazyLoad from "../shared/hooks/useLazyLoad";
import { Box, Skeleton, Grid, Dialog } from "@mui/material";
import Card from "../components/Cards/Card";
import ModalDetailProduct from "./components/ModalDetailProduct";
import { strMatch } from "../shared/helpers";
import { searchAtom } from "../shared/atoms";
import { useRecoilValue } from "recoil";

const Container = styled.div`
   position: relative;
   display: block;
   width: 100%;
`;

const Wrapper = styled.div`
   position: relative;
   display: flex;
   flex-flow: row wrap;
   margin: 2rem auto;
`;

let NUM_PER_PAGE = 6;

const Home = () => {
   const [pageNum, setPageNum] = useState<number>(1);
   const [listProduct, isLoading, _, hasNext] = useGetListProduct(pageNum);
   const [isTrigger, setTrigger] = useState<boolean>(true);
   const [loadingIntersect, setLoadingIntersect] = useState<boolean>(true);
   const [showModalDetail, setShowModalDetail] = useState<boolean>(false);
   const [dataModal, setDataModal] = useState<object>({});
   const observer = useRef<IntersectionObserver | null>();
   const triggerRef = useRef<HTMLDivElement>(null);

   const search = useRecoilValue(searchAtom);

   const onGrabData = (currentPage: number) => {
      const lastIndex = (currentPage - 1) * NUM_PER_PAGE;
      let sisa = data.length % NUM_PER_PAGE;

      return new Promise((resolve) => {
         setTimeout(() => {
            const slice = listProduct.slice(
               data.length + sisa > data.length ? data.length : lastIndex,
               lastIndex + NUM_PER_PAGE
            );

            if (data.length < listProduct.length) {
               setTrigger(true);
               setLoadingIntersect(true);
            }

            resolve(slice);
         }, 500);
      });
   };

   const lastCardRef = useCallback(
      (post?: any) => {
         if (isLoading) return;
         if (observer.current) observer.current.disconnect();

         observer.current = new IntersectionObserver((posts) => {
            if (posts[0].isIntersecting && hasNext) {
               setPageNum((prev: any) => prev + 1);
            }
         });

         if (post) observer.current.observe(post);
      },
      [isLoading, hasNext]
   );

   const onClickCard = (item: any) => {
      setShowModalDetail(true);
      setDataModal(item.Product);
   };

   const { data, loading } = useLazyLoad({ triggerRef, onGrabData });

   const FilterData = data.filter(
      (item: any) =>
         strMatch(search, item.Product.prdNm) || strMatch(search, item.Product.sellerPrdCd)
   );

   useEffect(() => {
      if (listProduct.length === 0) return;
      if (data.length === listProduct.length && data.length > 1 && !observer.current) {
         setPageNum((prev: any) => prev + 1);
      }

      if (data.length >= listProduct.length) {
         setTrigger(false);
      } else {
         setTrigger(true);
      }

      if (data.length === listProduct.length) {
         setLoadingIntersect(false);
      }
   }, [listProduct.length, triggerRef, data.length, loading]);

   return (
      <Container>
         {showModalDetail && (
            <Dialog open fullWidth onClose={() => setShowModalDetail(false)}>
               <ModalDetailProduct setShowModalDetail={setShowModalDetail} data={dataModal} />
            </Dialog>
         )}
         <Wrapper className="justify-content-ceenter">
            {/* {isLoading && "Loading..."} */}
            <Grid container>
               {FilterData.length > 0
                  ? FilterData.map((item: any, i: number) => {
                       return (
                          <Grid
                             onClick={() => onClickCard(item)}
                             key={item.prdNo}
                             item
                             xs={12}
                             md={6}
                             lg={4}
                          >
                             <Card data={item.Product} />
                          </Grid>
                       );
                    })
                  : search.length > 0 &&
                    !isTrigger &&
                    !hasNext && (
                       <div className="d-flex justify-content-center">
                          Whoops.... <br />
                          No Data Found :(
                       </div>
                    )}
               {isTrigger && (
                  <>
                     {Array.from(new Array(3)).map((item, i) => (
                        <Grid item xs={12} md={6} lg={4}>
                           <Box m={3}>
                              <Skeleton
                                 variant="rectangular"
                                 width={314}
                                 height={340}
                                 sx={{ borderRadius: "10px", mb: 2 }}
                              />
                              <Skeleton height={30} />
                              <Skeleton width="40%" height={25} sx={{ borderRadius: "10" }} />
                              <Skeleton width="40%" height={40} sx={{ borderRadius: "15px" }} />
                           </Box>
                        </Grid>
                     ))}
                  </>
               )}
               <div ref={lastCardRef} className={clsx("trigger", { visible: loading })}></div>
            </Grid>
         </Wrapper>
         {loadingIntersect && (
            <div ref={triggerRef} className={clsx("trigger", { visible: loading })}></div>
         )}
      </Container>
   );
};

export default Home;
