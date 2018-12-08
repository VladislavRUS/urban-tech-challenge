import React from 'react';
import {
  Wrapper,
  Header,
  Icon,
  IconBackgroundWrapper,
  IconWrapper,
  Title,
  TitleWrapper,
  ContentText
} from './Marker.styles';

const Marker = props => (
  <Wrapper>
    <Header>
      <IconBackgroundWrapper color={props.color}>
        <IconWrapper>
          <Icon source={props.icon} resizeMode={'contain'} />
        </IconWrapper>
      </IconBackgroundWrapper>
      <TitleWrapper color={props.color}>
        <Title>{props.title}</Title>
      </TitleWrapper>
    </Header>
    <ContentText>{props.text}</ContentText>
  </Wrapper>
);

export default Marker;
