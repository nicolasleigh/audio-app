import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigation';
import store from './src/store';
import AppContainer from './src/components/AppContainer';

export default function App() {
  // return <SignUp />;
  // return <SignIn />;
  // return <LostPassword />;
  // return <Verification />;
  return (
    <Provider store={store}>
      <AppContainer>
        <AppNavigator />
      </AppContainer>
    </Provider>
  );
}
