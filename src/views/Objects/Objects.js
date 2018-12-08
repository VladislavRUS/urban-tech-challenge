import React from 'react';
import { Wrapper, ObjectWrapper } from './Objects.styles';
import ObjectItem from './ObjectItem';
import * as Routes from '../../constants/routes';
import Store from '../../store';

class Objects extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Объекты для проверки',
      headerStyle: {
        backgroundColor: '#c73433'
      },
      headerTitleStyle: {
        color: '#fff'
      }
    };
  };

  onPress = object => {
    const { navigation } = this.props;

    Store.setCurrentObjectId(object.id);
    navigation.navigate(Routes.OBJECT_DETAILED);
  };

  render() {
    return (
      <Wrapper>
        {Store.objects.map(object => (
          <ObjectWrapper key={object.id}>
            <ObjectItem
              onPress={() => this.onPress(object)}
              customer={object.customer}
              address={object.address}
              expirationDate={object.expirationDate}
            />
          </ObjectWrapper>
        ))}
      </Wrapper>
    );
  }
}

export default Objects;
