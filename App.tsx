import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthRouter from './src/components/Router/AuthRouter';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from './src/features/index';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools());

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <AuthRouter />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
