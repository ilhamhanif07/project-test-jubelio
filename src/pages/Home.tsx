import React, { useEffect } from "react";
import { fetchListProduct } from "../api/query";

const Home = () => {
   useEffect(() => {
      fetchListProduct("1");
   }, []);
   return <div>Home</div>;
};

export default Home;
