import axios, { AxiosResponse } from "axios";
import convert from "xml-js";
import { API_KEY, BASE_URL, PATH_DETAIL, PATH_LISTING } from "../shared/constant";
import { RemoveJsonTextAttribute } from "../shared/helpers";

interface Product {
   [key: string]: any;
}

interface Response {
   data: Array<Product>;
   response?: any;
}

const client = axios.create({
   baseURL: BASE_URL,
   headers: {
      openapikey: API_KEY,
      Accept: "application/xml",
   },
});

export const fetchListProduct = async (pages: number): Promise<any> => {
   let data: any;
   try {
      await client
         .get(PATH_LISTING, {
            params: {
               page: pages,
            },
         })
         .then((response: AxiosResponse) => {
            data = convert.xml2js(response.data, {
               compact: true,
               textFn: RemoveJsonTextAttribute,
            });
         });
      return data?.Products?.product || {};
   } catch (error) {
      console.log(error);
      return { errMsg: { error } };
   }
};

export const fetchProductDetail = async (id: number): Promise<any> => {
   let data: any;

   try {
      await client.get(PATH_DETAIL + id).then((response: AxiosResponse) => {
         data = convert.xml2js(response.data, {
            compact: true,
            textFn: RemoveJsonTextAttribute,
            ignoreDeclaration: true,
         });
      });
      return data || [];
   } catch (error) {
      console.log(error);
      return { errMsg: { error } };
   }
};

export const fetchListProductnDetail = async (pages: number): Promise<any> => {
   let finalData: Response = { data: [], response: null };

   try {
      const fetchList = await fetchListProduct(pages);
      for (let i = 0; i < fetchList.length; i++) {
         const fetchDetailProd = await fetchProductDetail(fetchList[i].prdNo);
         finalData.data.push(fetchDetailProd.Product);
         finalData.response = { hasNext: true };
      }
      return finalData;
   } catch (error) {
      console.log(error);
      return { errMsg: { error } };
   }
};

export const fetchListProductnDetail1 = async (pages: number): Promise<any> => {
   let queryArray: Array<any> = [];
   let result: Response = { data: [], response: null };

   try {
      const fetchList = await fetchListProduct(pages);
      for (let i = 0; i < fetchList.length; i++) {
         queryArray.push(fetchProductDetail(fetchList[i].prdNo));
      }
   } catch (error) {
      console.log(error);
      return { errMsg: { error } };
   }

   return Promise.all(queryArray)
      .then((res: any) => {
         result.data = res;
         result.response = { hasNext: true };
         return result;
      })
      .catch((err) => console.log(err));
};
