import React from "react";
import { Route, Switch } from "react-router-dom";

import Index from "../pages/index";
import SaveProducts from "../pages/saveProducts";
import SavePages from "../pages/savePages";
import SavePartners from "../pages/savePartners";
import SaveCatalog from "../pages/saveCatalog";
import SaveDepoiment from "../pages/saveDepoiments";

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
    </Switch>
  );
}
