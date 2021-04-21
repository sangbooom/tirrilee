/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Image, Dimensions, FlatList} from 'react-native';
import {css} from '@emotion/native';
import database from '@react-native-firebase/database';
import LoadingPage from '../../LoadingPage';
import RatingPage from '../../RatingPage';
import Skeleton from '../../../commons/Skeleton';

export default class ProductPage extends Component {
  state = {
    beginIndex: 0,
    endIndex: 4,
    isLoading: false,
    isGetDataFinish: false,
    productList: [],
    navInfo: [
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
    ],
    isMounted: false,
  };

  deviceWidth = Dimensions.get('window').width;

  componentDidMount() {
    this.setState({isLoading: true, isGetDataFinish: true});
    database()
      .ref('상품목록')
      .on('value', snapshot => {
        console.log('처음 조회한 값 => ', snapshot.val());
        this.setState(
          {
            productList:
              snapshot.val() &&
              snapshot
                .val()
                [
                  this.state.navInfo.filter(info => info.status === true)[0]
                    .text
                ].slice(this.state.beginIndex, this.state.endIndex),
          },
          // () =>
          //   this.setState({
          //     beginIndex: this.state.beginIndex + 4,
          //     endIndex: this.state.endIndex + 4,
          //     isLoading: false,
          //     isGetDataFinish: false,
          //   }),
        );
      }),
      this.setState({
        beginIndex: this.state.beginIndex + 4,
        endIndex: this.state.endIndex + 4,
        isLoading: false,
        isGetDataFinish: false,
      });
  }

  componentDidUpdate(_, prevState: any) {
    if (prevState.navInfo !== this.state.navInfo) {
      this.setState({isLoading: true}, () =>
        database()
          .ref('상품목록')
          .on('value', snapshot => {
            console.log('변경된 값 => ', snapshot.val());
            this.setState(
              {
                productList:
                  snapshot.val() &&
                  snapshot
                    .val()
                    [
                      this.state.navInfo.filter(info => info.status === true)[0]
                        .text
                    ].slice(this.state.beginIndex, this.state.endIndex),
              },
              // () => this.setState({isLoading: false}),
            );
          }),
      );
      console.log("qwwqewqewqewqe");
      this.setState({isLoading: false});
    }
  }

  onPressTextFocus = (index: number) => {
    this.setState([
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
  };

  wrapper = css`
    flex: 1;
    width: ${this.deviceWidth}px;
    padding: 32px 13px;
    background-color: #ffffff;
  `;

  header = css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `;

  header_title = css`
    height: 36px;
    font-family: 'NotoSansKR-Bold';
    font-size: 24px;
    line-height: 36px;
    text-align: left;
    color: #000000;
  `;

  nav = css`
    flex-direction: row;
    margin-bottom: 16px;
  `;

  nav__after = css`
    top: 14px;
    margin: 0 12px;
    border: 0.5px solid #bfbfbf;
    height: 19px;
  `;

  nav_content = css`
    font-family: 'NotoSansKR-Regular';
    font-size: 16px;
    font-style: normal;
    text-align: left;
    color: #bfbfbf;
  `;

  nav_content__focused = css`
    font-family: 'NotoSansKR-Bold';
    font-size: 16px;
    font-style: normal;
    text-align: left;
    color: #000000;
  `;

  cardList_productName = css`
    font-family: 'NotoSansKR-Medium';
    font-size: 14px;
    line-height: 20px;
    text-align: left;
    color: #000000;
  `;

  cardList_price = css`
    font-family: 'NotoSansKR-Bold';
    font-size: 16px;
    line-height: 24px;
    text-align: left;
    color: #000000;
  `;

  cardList_won = css`
    font-family: 'NotoSansKR-Regular';
    font-size: 12px;
    line-height: 18px;
    text-align: left;
    color: #000000;
    padding: 3px;
  `;

  render() {
    const {navInfo, isLoading, isGetDataFinish, productList} = this.state;
    return (
      <React.Fragment>
        <View style={this.wrapper}>
          <View style={this.header}>
            <Text style={this.header_title}>상품 목록</Text>
            <Image
              source={require('../../../assets/image/search-3x-black.png')}
              style={{width: 24, height: 24}}
            />
          </View>
          <View style={this.nav}>
            {navInfo.map((info: any, index: any) => (
              <React.Fragment key={index}>
                {index === 0 ? null : <View style={this.nav__after} />}
                <Text
                  onPress={() => this.onPressTextFocus(index)}
                  style={
                    info.status ? this.nav_content__focused : this.nav_content
                  }>
                  {info.text}
                </Text>
              </React.Fragment>
            ))}
          </View>
          {isLoading && isGetDataFinish ? (
            new Array(productList && productList.length)
              .fill(1)
              .map((_, index) => {
                return <Skeleton key={index} />;
              })
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={2}
              keyExtractor={(item: any, index: any) => {
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
                  <View
                    style={css`
                      flex-direction: row;
                    `}>
                    <Text
                      style={[
                        this.cardList_productName,
                        css`
                          color: #226bef;
                        `,
                      ]}>
                      {`[${
                        navInfo.filter((info: any) => info.status === true)[0]
                          .text
                      }] `}
                    </Text>
                    <Text style={this.cardList_productName}>
                      {item.productName}
                    </Text>
                  </View>

                  <RatingPage />
                  <View
                    style={css`
                      flex-direction: row;
                    `}>
                    <Text style={this.cardList_price}>
                      {item.price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                    </Text>
                    <Text style={this.cardList_won}>원</Text>
                  </View>
                </View>
              )}
            />
          )}
        </View>
        {isLoading && <LoadingPage />}
      </React.Fragment>
    );
  }
}
