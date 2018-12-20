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
  PlusIcon,
  Row,
  Images,
  Image,
  DeleteImage,
  DeleteText
} from './Attaches.styles';
import { ImagePicker, Permissions } from 'expo';
import Card from '../../components/Card';
import plusIcon from '../../assets/icons/plus.png';
import photoIcon from '../../assets/icons/photo.png';
import micIcon from '../../assets/icons/mic.png';
import Store, { API_HOST } from '../../store';
import { observer } from 'mobx-react';

@observer
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
    let cameraRollGranted = false;
    let cameraGranted = false;

    const cameraRollPermission = await Permissions.getAsync(
      Permissions.CAMERA_ROLL
    );

    if (cameraRollPermission.status !== 'granted') {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === 'granted') {
        cameraRollGranted = true;
      }
    } else {
      cameraRollGranted = true;
    }

    const cameraPermission = await Permissions.getAsync(Permissions.CAMERA);

    if (cameraPermission.status !== 'granted') {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA);
      if (newPermission.status === 'granted') {
        cameraGranted = true;
      }
    } else {
      cameraGranted = true;
    }

    if (cameraGranted && cameraRollGranted) {
      this.takePhoto();
    }
  };

  takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false
    });

    try {
      await Store.uploadImage(result);
    } catch (e) {
    } finally {
      await Store.getContracts();
    }
  };

  onRemovePhoto = async photo => {
    await Store.removePhoto(photo);
    await Store.getContracts();
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
            <Images>
              {Store.images.map((imageAttach, idx) => (
                <Row key={idx}>
                  <Image
                    resizeMode={'cover'}
                    source={{ uri: API_HOST + '/' + imageAttach.data }}
                  />
                  <DeleteImage onPress={() => this.onRemovePhoto(imageAttach)}>
                    <DeleteText>X</DeleteText>
                  </DeleteImage>
                </Row>
              ))}
            </Images>
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
