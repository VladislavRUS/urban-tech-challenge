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
import ContractDetailed from './src/views/ContractDetailed';
import Comment from './src/views/Comment';
import Attaches from './src/views/Attaches';

const AuthNavigator = createStackNavigator({
  Auth
});

const ProfileNavigator = createStackNavigator({
  Profile
});

ProfileNavigator.navigationOptions = ({ navigation }) => ({
  title: 'Профиль'
});

const TasksNavigator = createStackNavigator({
  Contracts,
  ContractDetailed,
  Comment,
  Attaches
});

TasksNavigator.navigationOptions = ({ navigation }) => ({
  title: 'Проверка'
});

const MainNavigator = createBottomTabNavigator(
  {
    ProfileNavigator,
    TasksNavigator
  },
  {
    initialRouteName: Routes.TASKS_NAVIGATOR,
    tabBarOptions: {
      activeTintColor: 'red',
      labelStyle: {
        marginBottom: 15
      }
    }
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
