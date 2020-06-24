import React from "react";
import { Route, Switch } from "react-router-dom";

import Index from "../pages/index";
import System from "../pages/system";
import Category from "../pages/category";
import Product from "../pages/products";
import Catalog from "../pages/catalog";

import ListCategory from "../pages/listCategory";

export default function RoutesApp() {
  return (
    <Switch>
      <Route exact path="/">
        <Index />
      </Route>
      <Route path="/system">
        <System />
      </Route>
      <Route path="/category">
        <Category />
      </Route>
      <Route path="/product">
        <Product />
      </Route>
      <Route path="/catalog">
        <Catalog />
      </Route>
      <Route path="/listCategory">
        <ListCategory />
      </Route>
    </Switch>
  );
}
