import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import { allRoutes } from "./routes";
const Layout = React.lazy(() => import("../components/layout/Layout"));

const routes = [
   {
      path: "/",
      element: <Layout />,
      children: allRoutes,
   },
];

export const Router = () => {
   console.log(routes);

   let selectedRoutes = useRoutes(routes);
   return <Suspense fallback="Loading...">{selectedRoutes}</Suspense>;
};
