import React from "react";
import { Route, Switch } from "react-router-dom";

import Index from "../pages/index";
import SaveProducts from "../pages/saveProducts";
import SavePages from "../pages/savePages";

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
    </Switch>
  );
}
