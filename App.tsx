import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthNavigator from './src/navigation/AuthNavigator';
import {Provider} from 'react-redux';
import store from './src/store';

export default function App() {
  // return <SignUp />;
  // return <SignIn />;
  // return <LostPassword />;
  // return <Verification />;
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </Provider>
  );
}
