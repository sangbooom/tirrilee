import React from 'react';
import {View, Text, Button, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

interface MyPageProps {}

const MyPage: React.FC<MyPageProps> = () => {
  const logOutHandler = () => {
    Alert.alert('경고', '정말 로그아웃 하시겠습니까?', [
      {text: '확인', onPress: logOut},
      {text: '취소'},
    ]);
  };
  const logOut = () => {
    auth().signOut();
  };
  return (
    <View>
      <Text>MyPage</Text>
      <Button title="로그아웃" onPress={logOutHandler} />
    </View>
  );
};

export default MyPage;
