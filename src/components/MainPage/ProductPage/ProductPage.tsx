/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Image, Dimensions, FlatList} from 'react-native';
import {css} from '@emotion/native';
import database from '@react-native-firebase/database';
import LoadingPage from '../../LoadingPage';

interface ProductPageProps {}

interface productListType {
  productName: string;
  price: string;
  description: string;
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

  useEffect(() => {
    setLoading(true);
    database()
      .ref('상품목록')
      .on('value', snapshot => {
        setProductList(snapshot.val());
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   console.log('productList', productList);
  // }, [productList]);

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

  const card_list = css`
    // flex-direction: row;
    // flex-wrap: wrap;
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
          style={card_list}
          showsVerticalScrollIndicator={false}
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
                {
                  width: '50%',
                  height: 212,
                },
              ]}>
              <Text>{item.productName}</Text>
              <Text>{item.price}</Text>
            </View>
          )}
        />
      </View>
      {isLoading && <LoadingPage />}
    </React.Fragment>
  );
};

export default ProductPage;
