import React from 'react';
import {
  Wrapper,
  Header,
  Body,
  MarkerWrapper,
  SubjectTitle,
  Subject,
  DetailWrapper
} from './ObjectDetailed.styles';
import Store from '../../store';
import Card from '../../components/Card';
import Marker from '../../components/Marker';
import locationIcon from '../../assets/icons/location.png';
import timeIcon from '../../assets/icons/time.png';
import commentIcon from '../../assets/icons/comment.png';
import attachIcon from '../../assets/icons/attach.png';
import { computed } from 'mobx';
import Detail from './Detail';

class ObjectDetailed extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title', '');

    return {
      title,
      headerStyle: {
        backgroundColor: '#c73433'
      },
      headerTitleStyle: {
        color: '#fff'
      },
      headerTintColor: '#fff'
    };
  };

  @computed
  get object() {
    return Store.objects.find(object => object.id === Store.currentObjectId);
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ title: this.object.customer });
  }

  onComment = () => {
    console.log('Comment');
  };

  onAttach = () => {
    console.log('Attach');
  };

  render() {
    const { object } = this;

    return (
      <Wrapper>
        <Card activeOpacity={1}>
          <Header>
            <MarkerWrapper>
              <Marker
                icon={locationIcon}
                title={'Адрес'}
                text={object.address}
                color={'#c73433'}
              />
            </MarkerWrapper>
            <MarkerWrapper>
              <Marker
                icon={timeIcon}
                title={'Дата окончания'}
                text={object.expirationDate}
                color={'#69aa4f'}
              />
            </MarkerWrapper>
          </Header>
          <Body>
            <SubjectTitle>Предмет проверки:</SubjectTitle>
            <Subject>{object.subject}</Subject>
            <DetailWrapper>
              <Detail
                icon={commentIcon}
                text={'Ваш комментарий'}
                onPress={this.onComment}
              />
            </DetailWrapper>
            <DetailWrapper>
              <Detail
                icon={attachIcon}
                text={`Вложения (${Store.attaches.length})`}
                onPress={this.onAttach}
              />
            </DetailWrapper>
          </Body>
        </Card>
      </Wrapper>
    );
  }
}

export default ObjectDetailed;
