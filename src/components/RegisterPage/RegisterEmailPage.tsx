/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ScrollView,
} from 'react-native';
import {TopNavigation__back} from '../../assets/css/TopNavigation/TopNavigation';
import {InputFormA} from '../../assets/css/InputForm_A/InputFormA';
import {
  ButtonTypeB_next__Disabled,
  ButtonTypeB_next__Activation,
} from '../../assets/css/Buttons/ButtonTypeB';
import {css} from '@emotion/native';
import {useSelector, useDispatch} from 'react-redux';
import {actions, RootState} from '../../features';

interface RegisterEmailProps {
  navigation?: any;
}

const RegisterEmailPage: React.FC<RegisterEmailProps> = ({navigation}) => {
  const dispatch = useDispatch();
  // const {email: emails, password: passwords} = useSelector(
  //   (state: RootState) => state.user,
  // );

  const [email, setEmail] = useState('');
  const [isConfirmSuccess, setConfirmSuccess] = useState(false);

  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;

  useEffect(() => {
    dispatch(actions.changeUserEmail(email));
  }, [dispatch, email]);

  const onChangeEmailInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setEmail(event.nativeEvent.text);
    emailVerification(event.nativeEvent.text);
  };

  const emailVerification = (text: string) => {
    let regex = /[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+/gm;
    if (text.match(regex) !== null) {
      setConfirmSuccess(true);
    } else if (text.match(regex) === null && isConfirmSuccess) {
      setConfirmSuccess(false);
    }
  };

  const wrapper = css(`
    width: ${deviceWidth}px;
    height: ${deviceHeight}px;
    padding: 0 13px 24px;
    background-color: #ffffff;
  `);

  const content_title = css(`
    width: 236px;
    height: 29px;
    margin: 10px 125px 0px 0px;
    font-family: 'NotoSansKR-Medium';
    font-size: 20px;
    font-weight: 500;
    font-style: normal;
    line-height: 28px;
    text-align: left;
    color: #000000;
  `);

  const content_sub_title = css(`
    width: 260px;
    height: 20px;
    margin: 8px 151px 28px 0px;
    font-family: 'NotoSansKR-Regular';
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    line-height: 28px;
    text-align: left;
    color: #808080;
  `);

  const buttonTypeB_next__Disabled__Text = css(`
    width: 30px;
    height: 24px;
    font-family: 'NotoSansKR-Bold';
    font-size: 16px;
    font-weight: bold;
    font-style: normal;
    line-height: 24px;
    text-align: center;
    color: #bfbfbf;
  `);

  const buttonTypeB_next__Activation__Text = css(`
    width: 30px;
    height: 24px;
    font-family: 'NotoSansKR-Bold';
    font-size: 16px;
    font-weight: bold;
    font-style: normal;
    line-height: 24px;
    text-align: center;
    color: #ffffff;
  `);

  const confirmSuccess__true = css(`
    width: 130px;
    height: 18px;
    margin: 4px;
    font-family: 'NotoSansKR-Regular';
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    line-height: 18px;
    text-align: left;
    color: #6cd15a;
  `);

  const confirmSuccess__false = css(`
    width: 155px;
    height: 18px;
    margin: 4px;
    font-family: 'NotoSansKR-Regular';
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    line-height: 18px;
    text-align: left;
    color: #e64841;
  `);

  return (
    <ScrollView style={wrapper}>
      <TopNavigation__back>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/image/back-3x.png')}
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity>
      </TopNavigation__back>
      <View>
        <Text style={content_title}>이메일 주소를 입력해주세요.</Text>
        <Text style={content_sub_title}>
          이메일주소로 로그인 할 수 있습니다.
        </Text>
        <InputFormA
          placeholder="이메일"
          placeholderTextColor="#bfbfbf"
          onChange={onChangeEmailInput}
          value={email}
        />
        {email.length > 0 &&
          (isConfirmSuccess ? (
            <Text style={confirmSuccess__true}>올바른 이메일 형식입니다.</Text>
          ) : (
            <Text style={confirmSuccess__false}>
              올바른 이메일 형식이 아닙니다.
            </Text>
          ))}
        <View
          style={css`
            margin-bottom: ${email.length > 0 ? '290' : '310'}px;
          `}
        />
        {isConfirmSuccess ? (
          <ButtonTypeB_next__Activation
            activeOpacity={1}
            onPress={() => navigation.navigate('RegisterPasswordPage')}>
            <Text style={buttonTypeB_next__Activation__Text}>다음</Text>
          </ButtonTypeB_next__Activation>
        ) : (
          <ButtonTypeB_next__Disabled activeOpacity={1}>
            <Text style={buttonTypeB_next__Disabled__Text}>다음</Text>
          </ButtonTypeB_next__Disabled>
        )}
      </View>
    </ScrollView>
  );
};

export default RegisterEmailPage;
