import React from "react";
import { Route, Switch } from "react-router-dom";

import Index from "../pages/index";
import System from "../pages/system";
import Category from "../pages/category";

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
    </Switch>
  );
}
