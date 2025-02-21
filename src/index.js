import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import publicRoutes from "publicRoutes.js";

ReactDOM.render(
  <ChakraProvider>
    <CSSReset />
    <HashRouter>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path={`/admin`} component={AdminLayout} />
        <Route path={`/rtl`} component={RTLLayout} />
        {publicRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            component={route.component}
          />
        ))}
        <Redirect from={`/`} to="/admin/dashboard" />
      </Switch>
    </HashRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
