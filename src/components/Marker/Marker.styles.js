import styled from 'styled-components';

export const Wrapper = styled.View`
  display: flex;
  align-items: flex-start;
`;

export const Header = styled.View`
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const IconBackgroundWrapper = styled.View`
  margin-right: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${props => props.color || '#000'};
`;

export const IconWrapper = styled.View`
  width: 10px;
  height: 10px;
`;

export const Icon = styled.Image`
  width: 100%;
  height: 100%;
`;

export const TitleWrapper = styled.View`
  padding: 2px 8px;
  display: flex;
  align-items: center;
  background-color: ${props => props.color || '#000'};
  border-radius: 10px;
`;

export const Title = styled.Text`
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
`;

export const ContentText = styled.Text`
  color: #232323;
  font-size: 12px;
  font-weight: 300;
`;
