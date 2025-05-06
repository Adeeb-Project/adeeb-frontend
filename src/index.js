import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import dashRoutes from "routes.js";
import publicRoutes from "publicRoutes.js";

// Function to flatten nested routes
const flattenRoutes = (routes) => {
  let flatRoutes = [];
  
  routes.forEach(route => {
    if (route.component) {
      flatRoutes.push(route);
    }
    
    if (route.items) {
      flatRoutes = [...flatRoutes, ...flattenRoutes(route.items)];
    }
  });
  
  return flatRoutes;
};

// Flatten the dashboard routes
const flattenedDashRoutes = flattenRoutes(dashRoutes);

// Create a map of all routes for easy lookup
const allRoutes = [
  ...publicRoutes,
  ...flattenedDashRoutes
];

ReactDOM.render(
  <ChakraProvider>
    <CSSReset />
    <HashRouter>
      <Switch>
        {/* Layout routes */}
        <Route path="/auth" component={AuthLayout} />
        <Route path="/admin" component={AdminLayout} />
        <Route path="/rtl" component={RTLLayout} />
        
        {/* Authentication routes */}
        <Route path="/authentication/sign-in/cover" component={AuthLayout} />
        <Route path="/authentication/sign-up/cover" component={AuthLayout} />
        
        {/* Public routes */}
        {publicRoutes.map((route, index) => (
          <Route
            key={`public-${index}`}
            path={route.path}
            component={route.component}
          />
        ))}
        
        {/* Dashboard routes */}
        {flattenedDashRoutes.map((route, index) => {
          if (route.layout === "/auth") {
            return (
              <Route
                key={`dash-${index}`}
                path={route.path}
                render={(props) => (
                  <AuthLayout>
                    <route.component {...props} />
                  </AuthLayout>
                )}
              />
            );
          } else if (route.layout === "/admin") {
            return (
              <Route
                key={`dash-${index}`}
                path={route.path}
                render={(props) => (
                  <AdminLayout>
                    <route.component {...props} />
                  </AdminLayout>
                )}
              />
            );
          } else {
            return (
              <Route
                key={`dash-${index}`}
                path={route.path}
                component={route.component}
              />
            );
          }
        })}
        
        {/* Fallback route */}
        <Route path="*" component={() => <Redirect to="/" />} />
      </Switch>
    </HashRouter>
  </ChakraProvider>,
  document.getElementById("root")
);

function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* … */}
    </ChakraProvider>
  );
}
