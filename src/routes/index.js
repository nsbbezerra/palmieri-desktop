import React from "react";
import { Route, Switch } from "react-router-dom";

import Index from "../pages/index";
import SaveProducts from "../pages/saveProducts";
import SavePages from "../pages/savePages";
import SavePartners from "../pages/savePartners";
import SaveCatalog from "../pages/saveCatalog";
import SaveDepoiment from "../pages/saveDepoiments";
import ListProducts from "../pages/listProducts";
import ListPartners from "../pages/listPartners";
import System from "../pages/system";
import Home from "../pages/home";

export default function RoutesApp() {
  return (
    <Switch>
      <Route exact path="/">
        <Index />
      </Route>
      <Route path="/saveProducts">
        <SaveProducts />
      </Route>
      <Route path="/savePages">
        <SavePages />
      </Route>
      <Route path="/savePartners">
        <SavePartners />
      </Route>
      <Route path="/saveCatalog">
        <SaveCatalog />
      </Route>
      <Route path="/saveDepoiment">
        <SaveDepoiment />
      </Route>
      <Route path="/listProducts">
        <ListProducts />
      </Route>
      <Route path="/listPartners">
        <ListPartners />
      </Route>
      <Route path="/system">
        <System />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    </Switch>
  );
}
