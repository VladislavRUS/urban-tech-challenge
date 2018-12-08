import styled from 'styled-components';

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image`
  margin-bottom: 20px;
  width: 62px;
  height: 70px;
`;

export const Title = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Abbreviation = styled.Text`
  color: #0f0f0f;
  font-weight: 700;
  letter-spacing: 0.27px;
`;

export const City = styled.Text`
  padding-left: 3px;
  color: #4d4d4d;
  font-weight: 400;
  letter-spacing: 0.27px;
`;
