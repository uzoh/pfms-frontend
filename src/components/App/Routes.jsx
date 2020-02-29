import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "../views/NotFound";
import Login from "../views/Login";
import HomePage from "../views/HomePage";
import PensionerForm from "../views/PensionerForm";

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/new-pensioner" component={PensionerForm} />
      <Route
        exact
        path="/edit-pensioner/:pensionerID"
        component={PensionerForm}
      />
      <Route path="/" component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
