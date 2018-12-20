import styled, { css } from 'styled-components';

export const Wrapper = styled.TouchableOpacity`
  border-radius: 10px;
  background-color: #ffffff;

  ${props =>
    props.fullSize &&
    css`
      flex: 1;
    `}
`;
