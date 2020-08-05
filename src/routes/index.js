import React from "react";
import { Route, Switch } from "react-router-dom";

import Index from "../pages/index";
import System from "../pages/system";
import Category from "../pages/category";
import Product from "../pages/products";
import Catalog from "../pages/catalog";
import Comments from "../pages/comments";

import ListCategory from "../pages/listCategory";
import ListProduct from "../pages/listProduct";
import ListCatalog from "../pages/listCatalog";
import ListComments from "../pages/listComments";

import Modelagem from "../pages/modelagem";

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
      <Route path="/comments">
        <Comments />
      </Route>
      <Route path="/listCategory">
        <ListCategory />
      </Route>
      <Route path="/listProduct">
        <ListProduct />
      </Route>
      <Route path="/listCatalog">
        <ListCatalog />
      </Route>
      <Route path="/listComments">
        <ListComments />
      </Route>
      <Route path="/modelagem">
        <Modelagem />
      </Route>
    </Switch>
  );
}
