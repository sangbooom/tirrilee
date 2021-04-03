import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import {css} from '@emotion/native';
import {TopNavigation__logo} from '../../../assets/css/TopNavigation/TopNavigation';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const deviceWidth = Dimensions.get('window').width;
  const wrapper = css`
    flex: 1;
    width: ${deviceWidth}px;
    padding: 0 13px;
    background-color: #ffffff;
  `;
  return (
    <View style={wrapper}>
      <TopNavigation__logo>
        <Image
          source={require('../../../assets/image/header-logo-2x.png')}
          style={{width: 80, height: 21}}
        />
      </TopNavigation__logo>
    </View>
  );
};

export default HomePage;
