import styled from '@emotion/native';
import {Dimensions} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export const TopNavigation__back = styled.View`
  width: ${deviceWidth}px;
  height: 56px;
  margin: 0 0 28px;
  padding: 16px 325px 16px 0px;
  background-color: #ffffff;
`;

export const TopNavigation__logo = styled.View`
  width: ${deviceWidth}px;
  height: 56px;
  margin: 0 0 28px;
  padding: 18px 0 17px 7px;
  background-color: #ffffff;
`;

export const TopNavigation__done = styled.View`
  width: ${deviceWidth}px;
  height: 56px;
  padding: 16px 12px;
  background-color: #ffffff;
  flex-direction: row;
  justify-content: space-between;
`;
