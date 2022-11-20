import { Routes, Route } from "react-router-dom";

import { MainLayout } from "./layouts";
import {
  Home,
  CartPage,
  Favourites,
  ProfileSettings,
  Registration,
  LogIn,
  NotFoundPage,
  ProductPage,
  MyOrders,
  AuthRequired,
} from "./Pages";

import style from "./App.module.scss";

const App = () => {
  return (
    <div className="App">
      <MainLayout>
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
      </MainLayout>
    </div>
  );
};

export default App;
