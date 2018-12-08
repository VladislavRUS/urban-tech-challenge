import React from 'react';
import { Wrapper } from './Form.styles';

const Form = props => <Wrapper width={props.width}>{props.children}</Wrapper>;

export default Form;
