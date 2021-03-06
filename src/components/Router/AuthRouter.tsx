import React, {useState, useEffect} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import LoginPage from '../LoginPage/LoginPage';
import RegisterEmailPage from '../RegisterPage/RegisterEmailPage';
import RegisterPasswordPage from '../RegisterPage/RegisterPasswordPage';
import MainRouter from './MainRouter';

const AuthRouter: React.FC = () => {
  const Stack = createStackNavigator();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);

      if (loading) {
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      {user ? (
        <MainRouter />
      ) : (
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
        </Stack.Navigator>
      )}
    </React.Fragment>
  );
};

export default AuthRouter;
