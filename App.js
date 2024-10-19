import React from 'react';
import { Provider } from 'react-redux'

import AppContainer from './src'
import Store from './src/stores'

const store = Store();

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
