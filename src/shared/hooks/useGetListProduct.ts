import { useCallback, useEffect, useState } from "react";
import { fetchListProductnDetail1 } from "../../api/query";

interface Product {
   [key: string]: any;
}

export const useGetListProduct = (pages: number = 1): [Product[], boolean, boolean, boolean] => {
   const [listProduct, setListProduct] = useState<Product[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [isError, setIsError] = useState<boolean>(false);
   const [hasNext, setHasNext] = useState<boolean>(false);

   const fetchListProduct = useCallback(async () => {
      setIsLoading(true);

      await fetchListProductnDetail1(pages)
         .then((res) => {
            setHasNext(Boolean(res.data.length));
            setListProduct((prev) => [...prev, ...res.data]);
            setIsLoading(false);
         })
         .catch((e) => {
            setIsLoading(false);
            setIsError(true);
         });
   }, [pages]);

   useEffect(() => {
      fetchListProduct();
   }, [fetchListProduct, pages]);

   return [listProduct, isLoading, isError, hasNext];
};
