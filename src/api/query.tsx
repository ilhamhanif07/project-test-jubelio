import axios, { AxiosResponse } from "axios";
const client = axios.create({
   baseURL: "https://api.elevenia.co.id/rest",
   headers: {
      openapikey: "721407f393e84a28593374cc2b347a98",
      "Access-Control-Allow-Origin": "*",
      "Accept-Charset": "utf-8",
      "Content-Type": "application/xml",
   },
});

export const fetchListProduct = async (pages: string) => {
   let data: Array<any> = [];
   await client
      .get(`/prodservices/product/listing?page=${pages}`)
      .then((response: AxiosResponse) => {
         console.log(response);
      });

   return data;
};
