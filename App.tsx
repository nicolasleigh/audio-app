import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigation';
import store from './src/store';
import AppContainer from './src/components/AppContainer';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// import {clearAsyncStorage} from './src/utils/asyncStorage';

const queryClient = new QueryClient();

export default function App() {
  // clearAsyncStorage();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContainer>
          <AppNavigator />
        </AppContainer>
      </QueryClientProvider>
    </Provider>
  );
}
