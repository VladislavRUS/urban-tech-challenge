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
  @observable
  isLoading = false;

  componentDidMount() {
    Store.getContracts();
    this.comment = Store.comment;
  }

  onSave = async () => {
    this.isLoading = true;
    await Store.saveComment(this.comment);
    this.isLoading = false;
  };

  render() {
    return (
      <Wrapper>
        <Card activeOpacity={1} fullSize={true}>
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
              loading={this.isLoading}
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
