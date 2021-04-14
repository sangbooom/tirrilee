import React from 'react';
import {View} from 'react-native';
import {css} from '@emotion/native';

interface SkeletonProps {}

const Skeleton: React.FC<SkeletonProps> = () => {
  const skeleton_wrapper = css`
    flex-direction: row;
  `;

  const skeleton_card__pr = css`
    width: 50%;
    height: 232px;
    padding-right: 6px;
    margin-bottom: 30px;
  `;

  const skeleton_card__pl = css`
    width: 50%;
    height: 232px;
    padding-left: 6px;
    margin-bottom: 30px;
  `;

  const skeleton_img = css`
    width: 100%;
    height: 150px;
    background-color: #f2f2f2;
    border-radius: 6px;
    margin-bottom: 8px;
  `;

  const skeleton_productName = css`
    width: 80%;
    height: 18px;
    background-color: #f2f2f2;
    position: relative;
    overflow: hidden;
    margin-bottom: 8px;
  `;

  const skeleton_rating = css`
    width: 70%;
    height: 18px;
    background-color: #f2f2f2;
    position: relative;
    overflow: hidden;
    margin-bottom: 8px;
  `;
  const skeleton_won = css`
    width: 40%;
    height: 18px;
    background-color: #f2f2f2;
    position: relative;
    overflow: hidden;
  `;

  return (
    <View style={skeleton_wrapper}>
      <View style={skeleton_card__pr}>
        <View style={skeleton_img} />
        <View style={skeleton_productName} />
        <View style={skeleton_rating} />
        <View style={skeleton_won} />
      </View>
      <View style={skeleton_card__pl}>
        <View style={skeleton_img} />
        <View style={skeleton_productName} />
        <View style={skeleton_rating} />
        <View style={skeleton_won} />
      </View>
    </View>
  );
};

export default Skeleton;
