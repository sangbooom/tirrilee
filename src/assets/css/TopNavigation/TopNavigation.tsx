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
