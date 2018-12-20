import React from 'react';
import { ObjectWrapper, List } from './Objects.styles';
import ObjectItem from './ObjectItem';
import * as Routes from '../../constants/routes';
import Store from '../../store';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
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

  @observable
  isLoading = false;
  @observable
  isInitialized = false;

  @computed
  get contracts() {
    return Store.contracts || [];
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    this.isLoading = true;

    try {
      await Store.getContracts();
      this.isInitialized = true;
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  };

  onPress = object => {
    const { navigation } = this.props;

    Store.setCurrentObjectId(object.id);

    navigation.navigate(Routes.OBJECT_DETAILED, {
      onGoBack: this.init
    });
  };

  render() {
    return (
      <List
        contentContainerStyle={{ alignSelf: 'stretch', padding: 15 }}
        data={this.contracts.filter(contract => !contract.isFinished)}
        refreshing={this.isLoading}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={() => this.init()}
        renderItem={({ item }) => (
          <ObjectWrapper>
            <ObjectItem
              onPress={() => this.onPress(item)}
              customer={item.customer}
              address={item.address}
              expirationDate={item.expirationDate}
            />
          </ObjectWrapper>
        )}
      />
    );
  }
}

export default Objects;
