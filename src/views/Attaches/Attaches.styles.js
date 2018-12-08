import styled from 'styled-components';

export const Wrapper = styled.ScrollView`
  flex: 1;
  padding: 15px;
`;

export const Section = styled.View`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const IconWrapper = styled.View`
  width: 30px;
  height: 30px;
  background-color: #c73433;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.Image`
  width: 14px;
  height: 14px;
`;

export const Title = styled.Text`
  margin-left: 10px;
  color: #232323;
  font-size: 12px;
  font-weight: 500;
`;

export const Actions = styled.View`
  margin-left: auto;
`;

export const PlusIconWrapper = styled.TouchableOpacity`
  width: 12px;
  height: 12px;
`;

export const PlusIcon = styled.Image`
  width: 100%;
  height: 100%;
`;
