import React from 'react';
import {
  Wrapper,
  TextInput,
  TextInputWrapper,
  ButtonWrapper
} from './Comment.styles';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Store from '../../store';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
class Comment extends React.Component {
  static navigationOptions = {
    title: 'Комментарий',
    headerStyle: {
      backgroundColor: '#c73433'
    },
    headerTitleStyle: {
      color: '#fff'
    },
    headerTintColor: '#fff'
  };

  @observable
  comment = '';

  componentDidMount() {
    this.comment = Store.comment;
    console.log(Store.currentObject.attaches);
  }

  onSave = async () => {
    await Store.saveComment(this.comment);
    const { navigation } = this.props;

    navigation.goBack();
  };

  render() {
    return (
      <Wrapper>
        <Card activeOpacity={1}>
          <TextInputWrapper>
            <TextInput
              numberOfLines={3}
              textAlignVertical={'top'}
              value={this.comment}
              multiline={true}
              placeholder={'Введите комментарий'}
              onChangeText={text => (this.comment = text)}
            />
          </TextInputWrapper>
          <ButtonWrapper>
            <Button
              text={'Сохранить'}
              color={'#69aa4f'}
              onPress={this.onSave}
            />
          </ButtonWrapper>
        </Card>
      </Wrapper>
    );
  }
}

export default Comment;
