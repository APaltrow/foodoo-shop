import React, { Suspense, lazy, FC } from "react";

import { Routes, Route } from "react-router-dom";

import { PageLoader } from "./Components";
import { MainLayout } from "./layouts";
import { Home, LogIn, NotFoundPage, AuthRequired } from "./Pages";

import style from "./App.module.scss";

const CartPage = lazy(() =>
  import(/* webpackChunkName: "Cart" */ "./Pages/CartPage")
);
const ProductPage = lazy(() =>
  import(/* webpackChunkName: "Product" */ "./Pages/ProductPage")
);
const Favourites = lazy(() =>
  import(/* webpackChunkName: "Favourites" */ "./Pages/FavouritesPage")
);
const ProfileSettings = lazy(() =>
  import(/* webpackChunkName: "ProfileSettings" */ "./Pages/SettingsPage")
);
const MyOrders = lazy(() =>
  import(/* webpackChunkName: "MyOrders" */ "./Pages/MyOrdersPage")
);
const Registration = lazy(() =>
  import(/* webpackChunkName: "Registration" */ "./Pages/Registration")
);

const App = () => {
  return (
    <div className="App">
      <MainLayout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<AuthRequired />}>
              <Route index element={<Home />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="product/:id" element={<ProductPage />} />
              <Route path="settings" element={<ProfileSettings />} />
              <Route path="favourites" element={<Favourites />} />
              <Route path="my-orders" element={<MyOrders />} />
            </Route>

            <Route path="login" element={<LogIn />} />
            <Route path="registration" element={<Registration />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </div>
  );
};

export default App;
