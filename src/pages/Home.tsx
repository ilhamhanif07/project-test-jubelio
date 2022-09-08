import styled from "@emotion/styled";
import { Box, Dialog, Grid, Skeleton } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import Card from "../components/Cards/Card";
import { searchAtom } from "../shared/atoms";
import { strMatch } from "../shared/helpers";
import { useGetListProduct } from "../shared/hooks/useGetListProduct";
import ModalDetailProduct from "./components/ModalDetailProduct";

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

const Home = () => {
   const [pageNum, setPageNum] = useState<number>(1);
   const [listProduct, isLoading, _, hasNext] = useGetListProduct(pageNum);
   const [showModalDetail, setShowModalDetail] = useState<boolean>(false);
   const [dataModal, setDataModal] = useState<object>({});
   const observer = useRef<IntersectionObserver | null>();

   const search = useRecoilValue(searchAtom);
   const filterData = listProduct.filter(
      (item) => strMatch(search, item.Product.prdNm) || strMatch(search, item.Product.sellerPrdCd)
   );

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

   console.log(isLoading);

   return (
      <Container>
         {showModalDetail && (
            <Dialog open maxWidth="lg" onClose={() => setShowModalDetail(false)}>
               <ModalDetailProduct setShowModalDetail={setShowModalDetail} data={dataModal} />
            </Dialog>
         )}
         <Wrapper className="justify-content-ceenter">
            {/* {isLoading && "Loading..."} */}
            <Grid container>
               {filterData.length > 0
                  ? filterData.map((item: any, i: number) => {
                       if (filterData.length === i + 1) {
                          return (
                             <Grid
                                onClick={() => onClickCard(item)}
                                ref={lastCardRef}
                                key={i}
                                item
                                xs={12}
                                md={6}
                                lg={4}
                             >
                                <Card data={item.Product} />
                             </Grid>
                          );
                       }
                       return (
                          <Grid
                             onClick={() => onClickCard(item)}
                             key={i}
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
                    !hasNext && (
                       <div className="d-flex justify-content-center w-100">
                          <h4>Whoops.. Data not found</h4>
                       </div>
                    )}
               {(isLoading || hasNext) && (
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
                           {hasNext && <div ref={lastCardRef} />}
                        </Grid>
                     ))}
                  </>
               )}
            </Grid>
            {!isLoading && !hasNext && !search.length && (
               <div className="d-flex justify-content-center w-100">
                  <h4>No More Data.....</h4>
               </div>
            )}
         </Wrapper>
      </Container>
   );
};

export default Home;
