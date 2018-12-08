import React from 'react';
import { Wrapper, Icon, TextInput } from './Input.styles';

const Input = props => (
  <Wrapper>
    <Icon source={props.icon} />
    <TextInput
      {...props}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
    />
  </Wrapper>
);

export default Input;
