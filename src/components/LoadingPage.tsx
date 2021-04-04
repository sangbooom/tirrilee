/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {css} from '@emotion/native';

interface SearchPageProps {}

const SearchPage: React.FC<SearchPageProps> = () => {
  return (
    <View
      style={css`
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        opacity: 0.5;
        background-color: gray;
        align-items: center;
        justify-content: center;
        z-index: 999;
      `}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default SearchPage;
