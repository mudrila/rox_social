import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router/immutable'
import AppContainer from './App/AppContainer'

const RootContainer = ({store, history}) => (
  <React.Fragment>
    <CssBaseline/>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppContainer />
      </ConnectedRouter>
    </Provider>
  </React.Fragment>
);
RootContainer.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object
};
export default RootContainer
