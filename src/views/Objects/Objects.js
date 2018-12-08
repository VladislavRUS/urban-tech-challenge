import React from 'react';
import { Wrapper, ObjectWrapper } from './Objects.styles';
import ObjectItem from './ObjectItem';

const objects = [
  {
    id: 1,
    name: 'ГУП «Я взял твою бу»',
    expirationDate: '02.02.2019',
    address: 'ул. Большая Акиманка, 19'
  }
];

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

  render() {
    return (
      <Wrapper>
        {objects.map(object => (
          <ObjectWrapper key={object.id}>
            <ObjectItem
              name={object.name}
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
