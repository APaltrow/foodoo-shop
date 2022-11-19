import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CartPage from "./Pages/CartPage";
import LogIn from "./Pages/LogIn";
import Registration from "./Pages/Registration";
import NotFoundPage from "./Pages/NotFoundPage";
import ProductPage from "./Pages/ProductPage";
import MainLayout from "./layouts/MainLayout";
import AuthRequired from "./Pages/AuthRequired";
import ProfileSettings from "./Pages/SettingsPage";
import MyOrders from "./Pages/MyOrdersPage";
import Favourites from "./Pages/FavouritesPage";

import style from "./App.module.scss";

function App() {
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
}

export default App;
