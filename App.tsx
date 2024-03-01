import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigation';
import store from './src/store';
import AppContainer from './src/components/AppContainer';
// import {clearAsyncStorage} from './src/utils/asyncStorage';

export default function App() {
  // clearAsyncStorage();
  return (
    <Provider store={store}>
      <AppContainer>
        <AppNavigator />
      </AppContainer>
    </Provider>
  );
}
