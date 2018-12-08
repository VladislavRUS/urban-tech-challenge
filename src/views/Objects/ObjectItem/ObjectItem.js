import React from 'react';
import Card from '../../../components/Card';
import {
  Header,
  HeaderText,
  Body,
  MarkerWrapper,
  Forward
} from './ObjectItem.styles';
import Marker from '../../../components/Marker';
import locationIcon from '../../../assets/icons/location.png';
import timeIcon from '../../../assets/icons/time.png';

const ObjectItem = props => (
  <Card>
    <Header>
      <HeaderText>{props.name}</HeaderText>
    </Header>
    <Body>
      <MarkerWrapper>
        <Marker
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

export default ObjectItem;
