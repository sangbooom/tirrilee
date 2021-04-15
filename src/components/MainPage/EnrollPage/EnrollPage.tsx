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
  TextInput,
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
  const [textWhenTrue, setTextWhenTrue] = useState('');
  const [category, setCategory] = useState([
    {
      text: '에코백',
      status: true,
    },
    {
      text: '티셔츠',
      status: false,
    },
    {
      text: '기타물품',
      status: false,
    },
  ]);

  const deviceWidth = Dimensions.get('window').width;

  useEffect(() => {
    setTextWhenTrue(category.filter(info => info.status === true)[0].text);
  }, [category]);

  useEffect(() => {
    database()
      .ref('상품목록')
      .on('value', snapshot => {
        setProductListLength(
          snapshot.val()[category.filter(info => info.status === true)[0].text]
            ? Object.keys(
                snapshot.val()[
                  category.filter(info => info.status === true)[0].text
                ],
              ).length
            : 0,
        );
      });
  }, [category]);

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

  const onPressTextFocus = useCallback((index: number) => {
    setCategory([
      {
        text: '에코백',
        status: index === 0 ? true : false,
      },
      {
        text: '티셔츠',
        status: index === 1 ? true : false,
      },
      {
        text: '기타물품',
        status: index === 2 ? true : false,
      },
    ]);
  }, []);

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
        .ref(
          `/상품목록/${category.filter(info => info.status === true)[0].text}`,
        )
        .child(productListLength.toString())
        .set({
          imageSource: imageSource,
          productName: productName.trim(),
          price: price.trim(),
          description: description.trim(),
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

  const imagePicker_text = css`
    font-family: 'NotoSansKR-Regular';
    font-size: 14px;
    line-height: 20px;
    text-align: left;
    color: #bfbfbf;
  `;

  const chips_container = css`
    flex-direction: row;
  `;

  const chips__focused = css`
    height: 30px;
    margin: 12px 12px 28px 0;
    padding: 6px 12px;
    border-radius: 18px;
    background-color: #226bef;
  `;

  const chips = css`
    height: 30px;
    margin: 12px 12px 28px 0;
    padding: 6px 12px;
    border-radius: 18px;
    border: solid 1px #bfbfbf;
    background-color: #ffffff;
  `;

  const chips_text__focused = css`
    font-family: 'NotoSansKR-Medium';
    font-size: 12px;
    line-height: 18px;
    text-align: left;
    color: #ffffff;
  `;

  const chips_text = css`
    font-family: 'NotoSansKR-Medium';
    font-size: 12px;
    line-height: 18px;
    text-align: left;
    color: #bfbfbf;
  `;

  const onToggleModalVisible = useCallback(() => {
    setModalVisible(prev => !prev);
    setProductName('');
    setPrice('');
    setDescription('');
    setImageSource('');
    navigation.navigate('상품목록');
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
          {imageSource !== '' &&
          productName.length > 0 &&
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
            {imageSource === '' ? (
              <View
                style={css`
                  height: 324px;
                  justify-content: center;
                  align-items: center;
                `}>
                <Image
                  source={require('../../../assets/image/plus-3x.png')}
                  style={{
                    width: 38,
                    height: 38,
                    marginBottom: 9,
                  }}
                />
                <Text style={imagePicker_text}>사진을 등록하세요.</Text>
              </View>
            ) : (
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

            <View
              style={css`
                width: 334px;
                height: 48px;
                flex-direction: row;
                padding: 14px 0 14px 12px;
                margin-bottom: 24px;
                border-radius: 8px;
                border: solid 1px #eaeaea;
              `}>
              <TextInput
                textAlignVertical="top"
                style={css`
                  width: 288px;
                  height: 20px;
                  padding: 0;
                `}
                placeholder="가격 입력"
                placeholderTextColor="#bfbfbf"
                onChange={onChangePriceInput}
                value={price}
              />
              <Text
                style={css`
                  font-family: 'NotoSansKR-Regular';
                  font-size: 14px;
                  line-height: 20px;
                  text-align: left;
                  color: #000000;
                `}>
                원
              </Text>
            </View>

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
            <Text style={enrollContent_title}>카테고리</Text>
            <View style={chips_container}>
              {category.map((info, index) => (
                <TouchableOpacity
                  style={info.status ? chips__focused : chips}
                  key={index}
                  onPress={() => onPressTextFocus(index)}
                  activeOpacity={1}>
                  <Text style={info.status ? chips_text__focused : chips_text}>
                    {info.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default EnrollPage;
