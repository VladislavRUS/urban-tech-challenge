import React from 'react';
import { Wrapper, IconWrapper, Icon, Text } from './Detail.styles';

const Detail = props => (
  <Wrapper onPress={props.onPress}>
    <IconWrapper>
      <Icon source={props.icon} resizeMode={'contain'} />
    </IconWrapper>
    <Text>{props.text}</Text>
  </Wrapper>
);

export default Detail;
