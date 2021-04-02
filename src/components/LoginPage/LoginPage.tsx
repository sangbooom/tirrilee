/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import {css} from '@emotion/native';
import {ButtonTypeA} from '../../assets/css/Buttons/ButtonTypeA';
import {InputFormA} from '../../assets/css/InputForm_A/InputFormA';
import auth from '@react-native-firebase/auth';

interface LoginPageProps {
  navigation: any;
}

const LoginPage: React.FC<LoginPageProps> = ({navigation}) => {
  const [isloading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const deviceWidth = Dimensions.get('window').width;

  const onLoginUser = () => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      .then(() => {
        console.log('로그인 완료!');
        setLoading(false);
      })
      .catch(error => {
        console.log({error});
        setLoading(false);
      });
  };

  const onChangeLoginEmailInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setLoginEmail(event.nativeEvent.text);
  };

  const onChangeLoginPasswordInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setLoginPassword(event.nativeEvent.text);
  };

  const ButtonTypeA__Text = css(`
    width: 44px;
    height: 24px;
    font-family: 'NotoSansKR-Bold';
    font-size: 16px;
    font-weight: bold;
    // font-stretch: normal;
    font-style: normal;
    line-height: 24px;
    // letter-spacing: normal;
    text-align: center;
    color: #ffffff;
  `);

  const wrapper = css(`
    flex: 1;
    align-items: center;
    width: ${deviceWidth}px;
    padding: 100px 12px 60px 12px;
    background-color: #fcfcfc;
  `);

  const content = css(`
    font-family: 'NotoSansKR-Bold';
    font-size: 12px;
    line-height: 20px;
    font-weight: normal;
    font-style: normal;
    text-align: center;
    color: #3d3d3d;
  `);

  return (
    <React.Fragment>
      {isloading && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 0.5,
            backgroundColor: 'gray',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
          }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <ScrollView>
        <View style={wrapper}>
          <Image source={require('../../assets/image/header-logo-2x.png')} />
          <InputFormA
            style={css`
              margin: 60px 1px 0 0;
            `}
            placeholder="아이디"
            placeholderTextColor="#bfbfbf"
            onChange={onChangeLoginEmailInput}
            value={loginEmail}
          />
          <InputFormA
            style={css`
              margin: 12px 1px 16px 0;
            `}
            placeholder="비밀번호"
            placeholderTextColor="#bfbfbf"
            onChange={onChangeLoginPasswordInput}
            value={loginPassword}
            secureTextEntry
          />
          <ButtonTypeA onPress={onLoginUser} activeOpacity={1}>
            <Text style={ButtonTypeA__Text}>로그인</Text>
          </ButtonTypeA>
          <View
            style={css`
              flex-direction: row;
              align-self: flex-end;
              margin: 12px 0 112px 0;
            `}>
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterEmailPage')}
              activeOpacity={1}>
              <Text style={[content, {marginRight: 12}]}>* 회원가입</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('ID/PW 찾기')}
              activeOpacity={1}>
              <Text style={content}>* ID/PW 찾기</Text>
            </TouchableOpacity>
          </View>
          <Image source={require('../../assets/image/oo.png')} />
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default LoginPage;
