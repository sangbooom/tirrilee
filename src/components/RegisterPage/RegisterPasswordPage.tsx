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
  ActivityIndicator,
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
// import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

interface RegistePasswordProps {
  navigation?: any;
}

const RegisterPasswordPage: React.FC<RegistePasswordProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const {email} = useSelector((state: RootState) => state.user);

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isloading, setLoading] = useState(false);
  const [isPasswordSecure, setPasswordSecure] = useState(false);
  const [isPasswordSame, setPasswordSame] = useState(false);

  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;

  useEffect(() => {
    dispatch(actions.changeUserPassword(password));
  }, [dispatch, password]);

  const onChangePasswordInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setPassword(event.nativeEvent.text);
    passwordVerification(event.nativeEvent.text);
  };

  const onChangePasswordConfirmInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setPasswordConfirm(event.nativeEvent.text);
    passwordConfirmVerification(event.nativeEvent.text);
  };

  const passwordVerification = (text: string) => {
    let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!~@#$%^&*()?+=/])[A-Za-z0-9!~@#$%^&*()?+=/]{8,}$/gm;
    if (text.match(regex) !== null) {
      setPasswordSecure(true);
    } else if (text.match(regex) === null && isPasswordSecure) {
      setPasswordSecure(false);
    }
  };

  const passwordConfirmVerification = (text: string) => {
    if (password === text) {
      setPasswordSame(true);
    } else if (password !== text && isPasswordSame) {
      setPasswordSame(false);
    }
  };

  const onCreateUser = async () => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      // if (userCredentials.user) {
      //   await userCredentials.user.updateProfile({
      //     displayName: '박상범',
      //     photoURL: `1234`,
      //   });
      //   console.log(userCredentials.user);
      //   await userCredentials.user.reload();
      // }
      // database().ref('users').child(userCredentials.user.uid).set({
      //   name: userCredentials.user._auth._user.displayName,
      //   image: userCredentials.user._auth._user.photoURL,
      // });
      setLoading(false);
      goToLoginPage();
      dispatch(actions.changeUserEmail(''));
      dispatch(actions.changeUserPassword(''));
    } catch (error) {
      console.log({error});
      setLoading(false);
    }
  };

  const goToLoginPage = () => {
    navigation.navigate('LoginPage');
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
          <Text style={content_title}>비밀번호를 입력해주세요.</Text>
          <Text style={content_sub_title}>
            알파벳+숫자+특수문자 포함 8자 이상입니다.
          </Text>

          <InputFormA
            placeholder="비밀번호"
            placeholderTextColor="#bfbfbf"
            onChange={onChangePasswordInput}
            value={password}
            secureTextEntry
          />
          {password.length > 0 &&
            (isPasswordSecure ? null : (
              <Text style={confirmSuccess__false}>
                알파벳+숫자+특수문자 포함 8자 이상입니다.
              </Text>
            ))}

          <View style={{marginBottom: 8}} />

          <InputFormA
            placeholder="비밀번호 확인"
            placeholderTextColor="#bfbfbf"
            onChange={onChangePasswordConfirmInput}
            value={passwordConfirm}
            secureTextEntry
          />
          {password.length > 0 &&
            passwordConfirm.length > 0 &&
            (isPasswordSame ? (
              <Text style={confirmSuccess__true}>비밀번호가 일치합니다.</Text>
            ) : (
              <Text style={confirmSuccess__false}>
                비밀번호가 일치하지 않습니다.
              </Text>
            ))}
          <View
            style={css`
              margin-bottom: ${password.length > 0 ? '230' : '230'}px;
            `}
          />
          {isPasswordSecure && isPasswordSame ? (
            <ButtonTypeB_next__Activation
              activeOpacity={1}
              onPress={onCreateUser}>
              <Text style={buttonTypeB_next__Activation__Text}>다음</Text>
            </ButtonTypeB_next__Activation>
          ) : (
            <ButtonTypeB_next__Disabled activeOpacity={1}>
              <Text style={buttonTypeB_next__Disabled__Text}>다음</Text>
            </ButtonTypeB_next__Disabled>
          )}
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default RegisterPasswordPage;
