import { ConnectedRouter } from 'connected-react-router';
import {
  configureStore,
  getHistory,
} from 'src/modules/store';
import React from 'react';
import { Provider } from 'react-redux';
import RoutesComponent from 'src/view/shared/routes/RoutesComponent';
import jQuery from 'jquery';
import 'bootstrap/dist/js/bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ThemeProvider, { GlobalStyle } from './view/dashboard/analytics/Theme'
import LocalStorageContextProvider, { Updater as LocalStorageContextUpdater } from './view/dashboard/analytics/contexts/LocalStorage'
import TokenDataContextProvider, { Updater as TokenDataContextUpdater } from './view/dashboard/analytics/contexts/TokenData'
import GlobalDataContextProvider from './view/dashboard/analytics/contexts/GlobalData'
import PairDataContextProvider, { Updater as PairDataContextUpdater } from './view/dashboard/analytics/contexts/PairData'
import ApplicationContextProvider from './view/dashboard/analytics/contexts/Application'
import UserContextProvider from './view/dashboard/analytics/contexts/User'

(window as any).$ = (window as any).jQuery = jQuery;

const store = configureStore();

const App = (props) => {
  return (
    <LocalStorageContextProvider>
      <ApplicationContextProvider>
        <TokenDataContextProvider>
          <GlobalDataContextProvider>
            <PairDataContextProvider>
              <UserContextProvider>
                <Provider store={store}>
                  <ConnectedRouter history={getHistory()}>
                    <RoutesComponent />
                  </ConnectedRouter>
                </Provider>
              </UserContextProvider>
            </PairDataContextProvider>
          </GlobalDataContextProvider>
        </TokenDataContextProvider>
      </ApplicationContextProvider>
    </LocalStorageContextProvider>
  );
};

export default App;
