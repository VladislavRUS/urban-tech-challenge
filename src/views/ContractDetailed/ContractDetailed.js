import React from 'react';
import {
  Body,
  DetailWrapper,
  Header,
  MapImage,
  MapImageWrapper,
  MarkerWrapper,
  Option,
  Subject,
  SubjectTitle,
  Wrapper
} from './ContractDetailed.styles';
import Store from '../../store';
import Card from '../../components/Card';
import Marker from '../../components/Marker';
import locationIcon from '../../assets/icons/location.png';
import timeIcon from '../../assets/icons/time.png';
import commentIcon from '../../assets/icons/comment.png';
import attachIcon from '../../assets/icons/attach.png';
import { computed, observable } from 'mobx';
import Detail from './Detail';
import * as Routes from '../../constants/routes';
import Button from '../../components/Button';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import { observer } from 'mobx-react';

const options = [
  'Замечаний не обнаружено',
  'Работы не выполнены',
  'Работы не выполнены в полном объеме',
  'Нарушение сроков выполнения работ',
  'Неправомерное изменение условий контракта',
  'Начато ведение работ до заключение контракта',
  'Некачественное выполнение работ',
  'Отмена'
];

const CANCEL_BUTTON_INDEX = 7;

@observer
class ContractDetailed extends React.Component {
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
  get contract() {
    return Store.currentContract;
  }

  @observable
  isLoading = false;
  @observable
  actionSheet = null;

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ title: this.contract.customer });
  }

  handleRef = element => {
    this.actionSheet = element;
  };

  onComment = () => {
    const { navigation } = this.props;

    navigation.navigate(Routes.COMMENT);
  };

  onAttach = () => {
    const { navigation } = this.props;

    navigation.navigate(Routes.ATTACHES);
  };

  onEndPress = () => {
    this.actionSheet.show();
  };

  imageUrl = () => {
    return `https://image.maps.api.here.com/mia/1.6/routing?app_id=0zD1aVA8ZeJNMdQ72J7w&app_code=No96dAT7fCZufouKU6-4bw&waypoint0=55.763564,37.654062&waypoint1=${
      this.contract.latitude
    },${this.contract.longitude}`;
  };

  onActionSheet = async index => {
    if (index === CANCEL_BUTTON_INDEX) {
      return;
    }

    this.isLoading = true;

    try {
      await Store.finish(this.contract, options[index]);

      const { navigation } = this.props;

      const callback = navigation.getParam('onGoBack');
      await callback();

      navigation.goBack();
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  };

  render() {
    const { contract } = this;

    if (!contract) {
      return null;
    }

    return (
      <Wrapper contentContainerStyle={{ paddingBottom: 30 }}>
        <Card activeOpacity={1}>
          <MapImageWrapper>
            <MapImage
              resizeMode={'stretch'}
              source={{ uri: this.imageUrl() }}
            />
          </MapImageWrapper>

          <Header>
            <MarkerWrapper>
              <Marker
                icon={locationIcon}
                width={8}
                height={10}
                title={'Адрес'}
                text={contract.address}
                color={'#c73433'}
              />
            </MarkerWrapper>
            <MarkerWrapper>
              <Marker
                icon={timeIcon}
                title={'Дата окончания'}
                text={contract.expirationDate}
                color={'#69aa4f'}
              />
            </MarkerWrapper>
          </Header>
          <Body>
            <SubjectTitle>Предмет проверки:</SubjectTitle>
            <Subject>{contract.subject}</Subject>
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
            <Button
              loading={this.isLoading}
              text={'Завершить'}
              color={'#69aa4f'}
              onPress={this.onEndPress}
            />
          </Body>
        </Card>

        <ActionSheet
          ref={this.handleRef}
          title={'Есть ли замечания?'}
          cancelButtonIndex={options.length - 1}
          options={options.map((option, idx) => (
            <Option key={idx}>{option}</Option>
          ))}
          onPress={this.onActionSheet}
        />
      </Wrapper>
    );
  }
}

export default ContractDetailed;
