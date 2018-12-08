import React from 'react';
import { Wrapper, Text } from './Button.styles';
import Loader from '../Loader';

const Button = props => (
  <Wrapper onPress={props.onPress} activeOpacity={0.8}>
    {props.loading ? <Loader /> : <Text>{props.text}</Text>}
  </Wrapper>
);

export default Button;
