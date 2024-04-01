import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { PAGE_NOT_FOUND } from "./assets/constants";


const App = () => {
  const NotificationLazy = lazy(() => import("./ui/Notification"));
  const AddNewCocktailLazy = lazy(() => import("./pages/AddNewCocktail"));
 
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/addNewCocktail"
            element={
              <Suspense fallback={<CircularProgress />}>
                <AddNewCocktailLazy />
              </Suspense>
            }
          />
          <Route
            path="/*"
            element={
              <Suspense>
                <NotificationLazy message={PAGE_NOT_FOUND} />
              </Suspense>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
