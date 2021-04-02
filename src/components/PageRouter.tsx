import React, {useState, useEffect} from 'react';
// import {View, Text} from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
// import auth from '@react-native-firebase/auth';
import LoginPage from './LoginPage/LoginPage';
import RegisterEmailPage from './RegisterPage/RegisterEmailPage';
import RegisterPasswordPage from './RegisterPage/RegisterPasswordPage';
// import MainPage from './MainPage/MainPage';

const PageRouter: React.FC = () => {
  const Stack = createStackNavigator();
  //   const [initializing, setInitializing] = useState(true);
  //   const [userLogin, setUser] = useState();

  //   const onAuthStateChanged = user => {
  //     setUser(user);
  //     if (initializing) {
  //       setInitializing(false);
  //     }
  //     console.log(user);
  //   };

  //   useEffect(() => {
  //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //     return subscriber;
  //     // eslint-disable-next-line
  //   }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="LoginPage">
        {props => <LoginPage {...props} />}
      </Stack.Screen>
      <Stack.Screen name="RegisterEmailPage">
        {props => <RegisterEmailPage {...props} />}
      </Stack.Screen>
      <Stack.Screen name="RegisterPasswordPage">
        {props => <RegisterPasswordPage {...props} />}
      </Stack.Screen>
      {/* {!userLogin ? (
        <Stack.Screen name="LoginPage">
          {props => <LoginPage {...props} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="MainPage">
          {props => <MainPage {...props} user={userLogin} />}
        </Stack.Screen>
      )} */}
    </Stack.Navigator>
  );
};

export default PageRouter;
