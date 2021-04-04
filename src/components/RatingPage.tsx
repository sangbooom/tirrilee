/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image} from 'react-native';
import {css} from '@emotion/native';

interface RatingPageProps {}

const RatingPage: React.FC<RatingPageProps> = () => {
  const cardList_score = css`
    font-family: 'NotoSansKR-Regular';
    font-size: 12px;
    line-height: 18px;
    text-align: left;
    color: #666666;
  `;
  return (
    <View
      style={css`
        flex-direction: row;
      `}>
      <View
        style={css`
          flex-direction: row;
          margin-top: 2px;
        `}>
        <Image
          source={require('../assets/image/star-full-3x.png')}
          style={{width: 16, height: 16}}
        />
        <Image
          source={require('../assets/image/star-full-3x.png')}
          style={{width: 16, height: 16}}
        />
        <Image
          source={require('../assets/image/star-full-3x.png')}
          style={{width: 16, height: 16}}
        />
        <Image
          source={require('../assets/image/star-3x.png')}
          style={{width: 16, height: 16}}
        />
        <Image
          source={require('../assets/image/star-3x.png')}
          style={{width: 16, height: 16}}
        />
      </View>
      <Text style={cardList_score}>(3.0)</Text>
    </View>
  );
};

export default RatingPage;
