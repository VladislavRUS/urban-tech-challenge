import styled from 'styled-components';

export const Wrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const IconWrapper = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c73433;
`;
export const Icon = styled.Image`
  width: 13px;
  height: 13px;
`;

export const Text = styled.Text`
  margin-left: 10px;
  color: #5d5d5d;
  font-size: 12px;
  font-weight: 300;
`;
