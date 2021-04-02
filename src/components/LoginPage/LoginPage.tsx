/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import {css} from '@emotion/native';
import {ButtonTypeA} from '../../assets/css/Buttons/ButtonTypeA';
import {InputFormA} from '../../assets/css/InputForm_A/InputFormA';

interface LoginPageProps {
  navigation: any;
}

const LoginPage: React.FC<LoginPageProps> = ({navigation}) => {
  const deviceWidth = Dimensions.get('window').width;

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
    <View style={wrapper}>
      <Image source={require('../../assets/image/header-logo-2x.png')} />
      <InputFormA
        style={css`
          margin: 60px 1px 0 0;
        `}
        placeholder="아이디"
        placeholderTextColor="#bfbfbf"
      />
      <InputFormA
        style={css`
          margin: 12px 1px 16px 0;
        `}
        placeholder="비밀번호"
        placeholderTextColor="#bfbfbf"
      />
      <ButtonTypeA onPress={() => console.log('asdasdf')} activeOpacity={1}>
        <Text style={ButtonTypeA__Text}>로그인</Text>
      </ButtonTypeA>
      <View
        style={css`
          flex-direction: row;
          align-self: flex-end;
          margin: 12px 0 137px 0;
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
  );
};

export default LoginPage;
