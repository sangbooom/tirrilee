import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {css} from '@emotion/native';
import {TopNavigation__done} from '../../../assets/css/TopNavigation/TopNavigation';
import {InputFormA} from '../../../assets/css/InputForm_A/InputFormA';
import {InputFormB} from '../../../assets/css/InputForm_B/InputFormB';

interface EnrollPageProps {
  navigation: any;
}

const EnrollPage: React.FC<EnrollPageProps> = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(true);

  const deviceWidth = Dimensions.get('window').width;

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      e.preventDefault();

      setModalVisible(true);
    });

    return unsubscribe;
  }, [navigation]);

  const modal = css`
    flex: 1;
    width: ${deviceWidth}px;
    margin: 0;
    background-color: #ffffff;
  `;

  const topNavigation_title = css`
    padding-top: 10px;
    font-family: 'NotoSansKR-Bold';
    font-size: 16px;
    line-height: 12px;
    color: #000000;
  `;

  const topNavigation__true = css`
    padding-top: 10px;
    font-family: 'NotoSansKR-Medium';
    font-size: 16px;
    line-height: 12px;
    letter-spacing: -0.48px;
    color: #bfbfbf;
  `;

  const topNavigation__false = css`
    padding-top: 10px;
    font-family: 'NotoSansKR-Medium';
    font-size: 16px;
    line-height: 12px;
    letter-spacing: -0.48px;
    color: #bfbfbf;
  `;

  const enrollPhoto = css`
    width: ${deviceWidth}px;
    margin-bottom: 20px;
    height: 324px;
    padding: 0 0 139px;
    background-color: #f6f6f6;
  `;

  const enrollContent_container = css`
    padding: 0 12px;
  `;

  const enrollContent_title = css`
    margin: 0 0 8px 0;
    font-family: 'NotoSansKR-Bold';
    font-size: 18px;
    line-height: 27px;
    text-align: left;
    color: #000000;
  `;

  const onToggleModalVisible = useCallback(() => {
    setModalVisible(prev => !prev);
    navigation.navigate('홈');
  }, [navigation]);

  return (
    <Modal
      isVisible={isModalVisible}
      style={modal}
      onBackButtonPress={onToggleModalVisible}>
      <View style={{flex: 1}}>
        <TopNavigation__done>
          <TouchableOpacity onPress={onToggleModalVisible} activeOpacity={1}>
            <Image
              source={require('../../../assets/image/back-3x.png')}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
          <Text style={topNavigation_title}>등록하기</Text>
          <Text style={topNavigation__false}>완료</Text>
        </TopNavigation__done>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={enrollPhoto}
            activeOpacity={1}></TouchableOpacity>
          <View style={enrollContent_container}>
            <Text style={enrollContent_title}>제품명</Text>
            <InputFormA
              style={css`
                margin-bottom: 24px;
              `}
              placeholder="제품명 입력"
              placeholderTextColor="#bfbfbf"
            />

            <Text style={enrollContent_title}>가격</Text>
            <InputFormA
              style={css`
                margin-bottom: 24px;
              `}
              placeholder="가격 입력"
              placeholderTextColor="#bfbfbf"
            />

            <Text style={enrollContent_title}>상세 설명</Text>
            <InputFormB
              style={css`
                margin-bottom: 24px;
              `}
              multiline={true}
              textAlignVertical="top"
              placeholder="상세 설명 입력"
              placeholderTextColor="#bfbfbf"
            />
            <Text style={enrollContent_title}>카테고리</Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default EnrollPage;
