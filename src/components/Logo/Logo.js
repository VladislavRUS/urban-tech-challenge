import React from 'react';
import { Wrapper, Image, Title, Abbreviation, City } from './Logo.styles';
import logo from '../../assets/images/logo.png';

const Logo = () => (
  <Wrapper>
    <Image source={logo} />
    <Title>
      <Abbreviation>ГКУ</Abbreviation>
      <City>МОСКВЫ</City>
    </Title>
  </Wrapper>
);

export default Logo;
