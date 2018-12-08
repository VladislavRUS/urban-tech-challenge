import React from 'react';
import {
  Wrapper,
  Section,
  Header,
  IconWrapper,
  Icon,
  Title,
  Actions,
  PlusIconWrapper,
  PlusIcon
} from './Attaches.styles';
import Card from '../../components/Card';
import plusIcon from '../../assets/icons/plus.png';
import photoIcon from '../../assets/icons/photo.png';
import micIcon from '../../assets/icons/mic.png';

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
              <Actions>
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
