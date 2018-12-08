import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import Auth from './src/views/Auth';
import Profile from './src/views/Profile';
import Contracts from './src/views/Contracts';
import * as Routes from './src/constants/routes';

const AuthNavigator = createStackNavigator({
  Auth
});

const ProfileNavigator = createStackNavigator({
  Profile
});

ProfileNavigator.navigationOptions = ({ navigation }) => ({
  title: 'Профиль'
});

const ContractsNavigator = createStackNavigator({
  Contracts
});

ContractsNavigator.navigationOptions = ({ navigation }) => ({
  title: 'Контракты'
});

const MainNavigator = createBottomTabNavigator(
  {
    ProfileNavigator,
    ContractsNavigator
  },
  {
    initialRouteName: Routes.PROFILE_NAVIGATOR
  }
);

const createNavigator = () =>
  createSwitchNavigator(
    { AuthNavigator, MainNavigator },
    {
      initialRouteName: Routes.AUTH_NAVIGATOR
    }
  );

class App extends React.Component {
  constructor(props) {
    super(props);

    this.Navigator = createNavigator();
  }

  render() {
    const { Navigator } = this;

    return <Navigator />;
  }
}

export default App;
