import React from 'react';
import { Wrapper } from './Card.styles';

const Card = props => (
  <Wrapper onPress={props.onPress} activeOpacity={props.activeOpacity || 0.8}>
    {props.children}
  </Wrapper>
);

export default Card;
