import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider, observer } from "mobx-react";
import Layout from "./components/layout/index";
import routes from "./router";
import * as store from "./store";
import "./reset.less";
const ObserverRender = observer(() => {
  return renderRoutes(routes);
});
export default observer(() => {
  return (
    <Provider {...store}>
      <Router>
        <Layout>
          <Switch>
            <ObserverRender />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
});
