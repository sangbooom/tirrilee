/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../MainPage/HomePage/HomePage';
import EnrollPage from '../MainPage/EnrollPage/EnrollPage';
import ProductPage from '../MainPage/ProductPage/ProductPage';
import SearchPage from '../MainPage/SearchPage/SearchPage';
import MyPage from '../MainPage/Mypage/MyPage';
// import auth from '@react-native-firebase/auth';

interface MainRouterProps {}

const MainRouter: React.FC<MainRouterProps> = () => {
  const Tab = createBottomTabNavigator();
  // useEffect(() => {
  //   // auth().signOut();
  // }, []);

  return (
    <Tab.Navigator
      initialRouteName="홈"
      tabBarOptions={{
        activeTintColor: '#000000',
        inactiveTintColor: '#bfbfbf',
        keyboardHidesTabBar: true,
        style: {
          position: 'absolute', //input 창에 글쓸때 keypad 위에 tabbar가 남아있는 현상 고치기 위한 솔루션
          paddingBottom: 7,
          paddingTop: 7,
          height: 60,
        },
        labelStyle: {
          fontSize: 12,
          lineHeight: 18,
          fontFamily: 'NotoSansKR-Medium',
          margin: 0,
          padding: 0,
        },
      }}>
      <Tab.Screen
        name="홈"
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../assets/image/home-focused-3x.png')}
                style={{width: 32, height: 32}}
              />
            ) : (
              <Image
                source={require('../../assets/image/home-3x.png')}
                style={{width: 32, height: 32}}
              />
            ),
        }}>
        {props => <HomePage {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="상품목록"
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../assets/image/product-focused-3x.png')}
                style={{width: 32, height: 32}}
              />
            ) : (
              <Image
                source={require('../../assets/image/product-3x.png')}
                style={{width: 32, height: 32}}
              />
            ),
        }}>
        {props => <ProductPage {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="등록하기"
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../../assets/image/enroll-3x.png')}
              style={{width: 32, height: 32}}
            />
          ),
        }}>
        {props => <EnrollPage {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="검색"
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../../assets/image/search-3x.png')}
              style={{width: 32, height: 32}}
            />
          ),
        }}>
        {props => <SearchPage {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="마이페이지"
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                source={require('../../assets/image/mypage-focused-3x.png')}
                style={{width: 32, height: 32}}
              />
            ) : (
              <Image
                source={require('../../assets/image/mypage-3x.png')}
                style={{width: 32, height: 32}}
              />
            ),
        }}>
        {props => <MyPage {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainRouter;
