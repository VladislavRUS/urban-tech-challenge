import React from 'react';
import {
  Wrapper,
  Section,
  Header,
  IconWrapper,
  Icon,
  Title,
  Actions,
  ActionTitle,
  PlusIconWrapper,
  PlusIcon
} from './Attaches.styles';
import { ImagePicker, Permissions } from 'expo';
import Card from '../../components/Card';
import plusIcon from '../../assets/icons/plus.png';
import photoIcon from '../../assets/icons/photo.png';
import micIcon from '../../assets/icons/mic.png';
import Store from '../../store';

class Attaches extends React.Component {
  static navigationOptions = {
    title: 'Вложения',
    headerStyle: {
      backgroundColor: '#c73433'
    },
    headerTitleStyle: {
      color: '#fff'
    },
    headerTintColor: '#fff'
  };

  onAddPhoto = async () => {
    let granted = false;

    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);

    if (permission.status !== 'granted') {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === 'granted') {
        granted = true;
      }
    } else {
      granted = true;
    }

    if (granted) {
      this.takePhoto();
    }
  };

  takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false
    });

    Store.uploadImage(result);
  };

  render() {
    return (
      <Wrapper>
        <Card activeOpacity={1}>
          <Section>
            <Header>
              <IconWrapper>
                <Icon source={photoIcon} resizeMode={'contain'} />
              </IconWrapper>
              <Title>Фотографии</Title>
              <Actions onPress={this.onAddPhoto}>
                <ActionTitle>Добавить</ActionTitle>
                <PlusIconWrapper>
                  <PlusIcon source={plusIcon} resizeMode={'contain'} />
                </PlusIconWrapper>
              </Actions>
            </Header>
          </Section>
          <Section>
            <Header>
              <IconWrapper>
                <Icon source={micIcon} resizeMode={'contain'} />
              </IconWrapper>
              <Title>Аудио</Title>
              <Actions>
                <ActionTitle>Добавить</ActionTitle>
                <PlusIconWrapper>
                  <PlusIcon source={plusIcon} resizeMode={'contain'} />
                </PlusIconWrapper>
              </Actions>
            </Header>
          </Section>
        </Card>
      </Wrapper>
    );
  }
}

export default Attaches;
