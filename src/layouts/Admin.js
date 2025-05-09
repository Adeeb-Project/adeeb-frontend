import { ChakraProvider, Portal, useDisclosure } from '@chakra-ui/react';
import 'assets/css/pud-dashboard-styles.css';
import Configurator from 'components/Configurator/Configurator';
import FixedPlugin from 'components/FixedPlugin/FixedPlugin';
import Footer from 'components/Footer/Footer.js';
import MainPanel from 'components/Layout/MainPanel';
import PanelContainer from 'components/Layout/PanelContainer';
import PanelContent from 'components/Layout/PanelContent';
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import { SidebarContext } from 'contexts/SidebarContext';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from 'routes.js';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import theme from 'theme/theme.js';

export default function Dashboard(props) {
  // 🔐 Token check - if not authenticated, redirect to /sign-in
  const isAuthenticated = !!localStorage.getItem('authToken');
  if (!isAuthenticated) {
    return <Redirect to="/sign-in" />;
  }

  const { ...rest } = props;
  const [sidebarVariant, setSidebarVariant] = useState('transparent');
  const [fixed, setFixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(275);
  const mainPanel = React.createRef();

  const getRoute = () => {
    return window.location.pathname !== '/admin/full-screen-maps';
  };

  const getActiveRoute = (routes) => {
    let activeRoute = 'Default Brand Text';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) return collapseActiveRoute;
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute !== activeRoute) return categoryActiveRoute;
      } else if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
    }
    return activeRoute;
  };

  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) return collapseActiveNavbar;
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) return categoryActiveNavbar;
      } else if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondaryNavbar;
      }
    }
    return activeNavbar;
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      if (prop.collapse) return getRoutes(prop.items);
      if (prop.category) return getRoutes(prop.items);
      return null;
    });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  document.documentElement.dir = 'ltr';
  document.documentElement.layout = 'admin';

  return (
    <ChakraProvider theme={theme} resetCss={false} overflow="scroll">
      <SidebarContext.Provider
        value={{
          sidebarWidth,
          setSidebarWidth,
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar
          routes={routes}
          logoText={'Adeeb'}
          display="none"
          sidebarVariant={sidebarVariant}
          {...rest}
        />
        <MainPanel
          ref={mainPanel}
          w={{
            base: '100%',
            xl: `calc(100% - ${sidebarWidth}px)`,
          }}
        >
          <Portal>
            <AdminNavbar
              onOpen={onOpen}
              logoText={'Adeeb'}
              brandText={getActiveRoute(routes)}
              secondary={getActiveNavbar(routes)}
              fixed={fixed}
              {...rest}
            />
          </Portal>

          {getRoute() ? (
            <PanelContent>
              <PanelContainer>
                <Switch>
                  {getRoutes(routes)}
                  <Redirect from="/admin" to="/admin/dashboard/default" />
                </Switch>
              </PanelContainer>
            </PanelContent>
          ) : null}

          <Footer />

          <Portal>
            <FixedPlugin fixed={fixed} onOpen={onOpen} />
          </Portal>

          <Configurator
            secondary={getActiveNavbar(routes)}
            isOpen={isOpen}
            onClose={onClose}
            isChecked={fixed}
            onSwitch={(value) => setFixed(value)}
            onOpaque={() => setSidebarVariant('opaque')}
            onTransparent={() => setSidebarVariant('transparent')}
          />
        </MainPanel>
      </SidebarContext.Provider>
    </ChakraProvider>
  );
}
