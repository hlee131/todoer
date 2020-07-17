import ReactDOM from "react-dom";
import React, { Fragment } from "react";
import { Provider } from "react-redux";
import { Switch, Route, HashRouter } from "react-router-dom";

import store from "../store";

import Login from "./accounts/Login.jsx";
import Register from "./accounts/Register.jsx";
import PrivateRoute from "./misc/PrivateRoute.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";

export default function App(props) {
  return (
    <Provider store={store}>
      <HashRouter>
        <Fragment>
          <div className="container">
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </div>
        </Fragment>
      </HashRouter>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
