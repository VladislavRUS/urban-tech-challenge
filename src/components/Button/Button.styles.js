import styled from 'styled-components';

export const Wrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 20px;
  background-color: ${props => props.color || '#c73433'};
`;

export const Text = styled.Text`
  color: #ffffff;
  font-size: 12px;
  font-weight: 300;
`;
