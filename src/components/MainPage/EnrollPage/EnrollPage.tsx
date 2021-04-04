/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {css} from '@emotion/native';
import {TopNavigation__done} from '../../../assets/css/TopNavigation/TopNavigation';
import {InputFormA} from '../../../assets/css/InputForm_A/InputFormA';
import {InputFormB} from '../../../assets/css/InputForm_B/InputFormB';
import database from '@react-native-firebase/database';
import ImagePicker from 'react-native-image-picker';

interface EnrollPageProps {
  navigation: any;
}

const EnrollPage: React.FC<EnrollPageProps> = ({navigation}) => {
  const [productListLength, setProductListLength] = useState(0);
  const [isModalVisible, setModalVisible] = useState(true);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageSource, setImageSource] = useState('');

  const deviceWidth = Dimensions.get('window').width;

  useEffect(() => {
    database()
      .ref('상품목록')
      .on('value', snapshot => {
        setProductListLength(
          snapshot.val() ? Object.keys(snapshot.val()).length : 0,
        );
      });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'tabPress',
      (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        event.preventDefault();
        setModalVisible(true);
      },
    );
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    console.log('imageSource', imageSource);
  }, [imageSource]);

  const options = {
    title: '프로필 변경',
    cancelButtonTitle: '취소',
    takePhotoButtonTitle: '사진 찍기',
    chooseFromLibraryButtonTitle: '앨범에서 선택',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const showImagePicker = () => {
    ImagePicker.showImagePicker(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        Alert.alert(response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setImageSource(response.uri);
      }
    });
  };

  const onChangeProductNameInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setProductName(event.nativeEvent.text);
  };

  const onChangePriceInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setPrice(event.nativeEvent.text);
  };

  const onChangeDescriptionInput = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setDescription(event.nativeEvent.text);
  };

  const onSubmitDatabase = () => {
    try {
      database()
        .ref('상품목록')
        .child(productListLength.toString())
        .set({
          imageSource: imageSource,
          productName: productName,
          price: price,
          description: description,
        })
        .then(() =>
          Alert.alert('완료', '상품이 등록되었습니다.', [
            {
              text: '확인',
              onPress: onToggleModalVisible,
            },
          ]),
        );
    } catch (error) {
      console.log({error});
    }
  };

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
    color: #226bef;
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
    setProductName('');
    setPrice('');
    setDescription('');
    setImageSource('');
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
          {productName.length > 0 &&
          price.length > 0 &&
          description.length > 0 ? (
            <Text style={topNavigation__true} onPress={onSubmitDatabase}>
              완료
            </Text>
          ) : (
            <Text style={topNavigation__false}>완료</Text>
          )}
        </TopNavigation__done>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={enrollPhoto}
            activeOpacity={1}
            onPress={showImagePicker}>
            {imageSource === '' ? null : (
              <Image
                source={{uri: imageSource}}
                style={{
                  width: deviceWidth,
                  height: 324,
                }}
              />
            )}
          </TouchableOpacity>
          <View style={enrollContent_container}>
            <Text style={enrollContent_title}>제품명</Text>
            <InputFormA
              style={css`
                margin-bottom: 24px;
              `}
              placeholder="제품명 입력"
              placeholderTextColor="#bfbfbf"
              onChange={onChangeProductNameInput}
              value={productName}
            />

            <Text style={enrollContent_title}>가격</Text>
            <InputFormA
              style={css`
                margin-bottom: 24px;
              `}
              placeholder="가격 입력"
              placeholderTextColor="#bfbfbf"
              onChange={onChangePriceInput}
              value={price}
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
              onChange={onChangeDescriptionInput}
              value={description}
            />
            {/* <Text style={enrollContent_title}>카테고리</Text> */}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default EnrollPage;
