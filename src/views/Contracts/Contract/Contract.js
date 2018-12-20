import React from 'react';
import Card from '../../../components/Card';
import {
  Header,
  HeaderText,
  Body,
  MarkerWrapper,
  Forward
} from './Contract.styles';
import Marker from '../../../components/Marker';
import locationIcon from '../../../assets/icons/location.png';
import timeIcon from '../../../assets/icons/time.png';

const Contract = props => (
  <Card onPress={props.onPress}>
    <Header>
      <HeaderText>{props.customer}</HeaderText>
    </Header>
    <Body>
      <MarkerWrapper>
        <Marker
          width={8}
          height={10}
          icon={locationIcon}
          title={'Адрес'}
          text={props.address}
          color={'#c73433'}
        />
      </MarkerWrapper>
      <MarkerWrapper>
        <Marker
          icon={timeIcon}
          title={'Дата окончания'}
          text={props.expirationDate}
          color={'#69aa4f'}
        />
      </MarkerWrapper>
      <Forward>Перейти ></Forward>
    </Body>
  </Card>
);

export default Contract;
