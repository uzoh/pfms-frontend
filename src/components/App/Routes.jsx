import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFound from '../views/NotFound';
import Login from '../views/Login';
import Register from '../views/Register';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/" component={NotFound} />
        </Switch>
    </Router>
);

export default Routes;