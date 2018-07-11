import '@babel/polyfill'

import React from 'react'
import {render} from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import configureStore from './components/Root/redux/store/configureStore'
import Root from './components/Root/Root'

const history = createHistory();
export const store = configureStore(history);
render(
  <Root store={store} history={history}/>,
  document.getElementById('app')
);
