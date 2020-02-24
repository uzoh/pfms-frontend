import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "../views/NotFound";
import Login from "../views/Login";
import HomePage from "../views/HomePage";

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={HomePage} />
      <Route path="/" component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
