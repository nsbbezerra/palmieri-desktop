import React from "react";
import { Route, Switch } from "react-router-dom";

import Index from "../pages/index";

export default function RoutesApp() {
  return (
    <Switch>
      <Route exact path="/">
        <Index />
      </Route>
    </Switch>
  );
}
