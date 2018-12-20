import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import {
  Wrapper,
  BackgroundImage,
  Content,
  LogoWrapper,
  FormElementWrapper
} from './Auth.styles';
import Logo from '../../components/Logo';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import lockIcon from '../../assets/icons/lock.png';
import userIcon from '../../assets/icons/user.png';
import moscowImage from '../../assets/images/moscow.png';
import Store from '../../store';

import * as Routes from '../../constants/routes';

@observer
class Auth extends React.Component {
  static navigationOptions = {
    header: null
  };

  @observable
  loaderTimeout = null;
  @observable
  login = 'frontguys@gku.ru';
  @observable
  password = '*****';
  @observable
  isLoading = false;

  onLoginChange = text => {
    console.log(text);
  };

  onPasswordChange = text => {
    console.log(text);
  };

  onSubmit = async () => {
    this.isLoading = true;

    await Store.getUsers();

    const { navigation } = this.props;
    navigation.navigate(Routes.MAIN_NAVIGATOR);
  };

  componentWillUnmount() {
    clearTimeout(this.loaderTimeout);
  }

  render() {
    return (
      <Wrapper>
        <BackgroundImage source={moscowImage} />
        <Content>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>

          <Form width={235}>
            <FormElementWrapper>
              <Input
                placeholder={'Введите логин'}
                icon={userIcon}
                value={this.login}
              />
            </FormElementWrapper>
            <FormElementWrapper>
              <Input
                placeholder={'Введите пароль'}
                icon={lockIcon}
                value={this.password}
              />
            </FormElementWrapper>
            <FormElementWrapper>
              <Button
                text={'Войти'}
                loading={this.isLoading}
                onPress={this.onSubmit}
              />
            </FormElementWrapper>
          </Form>
        </Content>
      </Wrapper>
    );
  }
}

export default Auth;
