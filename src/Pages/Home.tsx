import React, { FC } from "react";

import { Navbar } from "../layouts";
import { DishCardsCatalog } from "../Components";

export const Home: FC = () => {
  return (
    <>
      <Navbar />
      <DishCardsCatalog />
    </>
  );
};
