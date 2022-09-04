import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ErrorHandling from "../components/ErrorHandling";

const Layout = lazy(() => import("../components/layout/Layout"));
const Home = lazy(() => import("../pages/Home"));

export const Router = () => (
   <ErrorHandling>
      <Suspense fallback={""}>
         <Layout>
            <Routes>
               <Route path="/" element={<Home />} />
            </Routes>
         </Layout>
      </Suspense>
   </ErrorHandling>
);
