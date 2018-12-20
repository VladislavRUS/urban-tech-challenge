import styled from 'styled-components';

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  ${{ borderBottomWidth: 1 }};
  ${{ borderBottomColor: '#dedede' }};
`;

export const HeaderText = styled.Text`
  padding: 15px 15px 10px 15px;
  color: #232323;
  font-size: 16px;
  font-weight: 400;
`;

export const Body = styled.View`
  position: relative;
  padding: 15px;
`;

export const MarkerWrapper = styled.View`
  margin-bottom: 10px;
`;

export const Forward = styled.Text`
  position: absolute;
  bottom: 25px;
  right: 15px;
  color: #989898;
  font-size: 12px;
  font-weight: 300;
`;
