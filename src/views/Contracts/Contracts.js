import React from 'react';
import { List, ListItem } from './Contracts.styles';
import Contract from './Contract';
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

  onPress = contract => {
    const { navigation } = this.props;

    Store.setCurrentContractId(contract.id);

    navigation.navigate(Routes.CONTRACT_DETAILED, {
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
          <ListItem>
            <Contract
              onPress={() => this.onPress(item)}
              customer={item.customer}
              address={item.address}
              expirationDate={item.expirationDate}
            />
          </ListItem>
        )}
      />
    );
  }
}

export default Objects;
