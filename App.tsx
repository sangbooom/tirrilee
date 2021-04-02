import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import PageRouter from './src/components/PageRouter';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from './src/features/index';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools());

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PageRouter />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
