import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

interface MainPageProps {
  user: any;
}

const MainPage: React.FC<MainPageProps> = () => {
  useEffect(() => {
    // auth().signOut();
  }, []);

  return (
    <View>
      <Text>메인페이지다!! 야호</Text>
    </View>
  );
};

export default MainPage;
