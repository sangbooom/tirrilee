/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Image, Dimensions, FlatList, Alert} from 'react-native';
import {css} from '@emotion/native';
import database from '@react-native-firebase/database';
import LoadingPage from '../../LoadingPage';
import RatingPage from '../../RatingPage';

interface ProductPageProps {}

interface productListType {
  productName: string;
  price: string;
  description: string;
  imageSource: string;
}

const ProductPage: React.FC<ProductPageProps> = () => {
  const [isLoading, setLoading] = useState(false);
  const [productList, setProductList] = useState<Array<productListType>>([]);
  const [navInfo, setNavInfo] = useState([
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
    setLoading(true);
    database()
      .ref('상품목록')
      .on('value', snapshot => {
        setProductList(snapshot.val());
        setLoading(false);
      });
  }, []);

  const onPressTextFocus = useCallback((index: number) => {
    setNavInfo([
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

  const wrapper = css`
    flex: 1;
    width: ${deviceWidth}px;
    padding: 32px 13px;
    background-color: #ffffff;
  `;

  const header = css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `;

  const header_title = css`
    height: 36px;
    font-family: 'NotoSansKR-Bold';
    font-size: 24px;
    line-height: 36px;
    text-align: left;
    color: #000000;
  `;

  const nav = css`
    flex-direction: row;
    margin-bottom: 16px;
  `;

  const nav__after = css`
    top: 14px;
    margin: 0 12px;
    border: 0.5px solid #bfbfbf;
    height: 19px;
  `;

  const nav_content = css`
    font-family: 'NotoSansKR-Regular';
    font-size: 16px;
    font-style: normal;
    text-align: left;
    color: #bfbfbf;
  `;

  const nav_content__focused = css`
    font-family: 'NotoSansKR-Bold';
    font-size: 16px;
    font-style: normal;
    text-align: left;
    color: #000000;
  `;

  const cardList_productName = css`
    font-family: 'NotoSansKR-Medium';
    font-size: 14px;
    line-height: 20px;
    text-align: left;
    color: #000000;
  `;

  const cardList_price = css`
    font-family: 'NotoSansKR-Bold';
    font-size: 16px;
    line-height: 24px;
    text-align: left;
    color: #000000;
  `;

  const cardList_won = css`
    font-family: 'NotoSansKR-Regular';
    font-size: 12px;
    line-height: 18px;
    text-align: left;
    color: #000000;
    padding: 3px;
  `;

  return (
    <React.Fragment>
      <View style={wrapper}>
        <View style={header}>
          <Text style={header_title}>상품 목록</Text>
          <Image
            source={require('../../../assets/image/search-3x-black.png')}
            style={{width: 24, height: 24}}
          />
        </View>
        <View style={nav}>
          {navInfo.map((info, index) => (
            <React.Fragment key={index}>
              {index === 0 ? null : <View style={nav__after} />}
              <Text
                onPress={() => onPressTextFocus(index)}
                style={info.status ? nav_content__focused : nav_content}>
                {info.text}
              </Text>
            </React.Fragment>
          ))}
        </View>
        <FlatList
          // showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          data={productList}
          renderItem={({item, index}) => (
            <View
              key={index}
              style={[
                index === productList.length - 1 &&
                  css`
                    margin-bottom: 30px;
                  `,
                index % 2 === 0 &&
                  css`
                    padding-right: 6px;
                  `,
                index % 2 === 1 &&
                  css`
                    padding-left: 6px;
                  `,
                {
                  width: '50%',
                  height: 232,
                },
              ]}>
              <Image
                source={{uri: item.imageSource}}
                style={{
                  width: '100%',
                  height: 150,
                  borderRadius: 6,
                  marginBottom: 8,
                }}
              />
              <Text style={cardList_productName}>{item.productName}</Text>
              <RatingPage />
              <View
                style={css`
                  flex-direction: row;
                `}>
                <Text style={cardList_price}>{item.price}</Text>
                <Text style={cardList_won}>원</Text>
              </View>
            </View>
          )}
        />
      </View>
      {isLoading && <LoadingPage />}
    </React.Fragment>
  );
};

export default ProductPage;
