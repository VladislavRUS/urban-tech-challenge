import styled from 'styled-components';

export const Wrapper = styled.ScrollView`
  flex: 1;
  padding: 15px;
`;

export const Header = styled.View`
  padding: 15px;
  ${{ borderBottomWidth: 1 }};
  ${{ borderBottomColor: '#dedede' }};
`;

export const Body = styled.View`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

export const MarkerWrapper = styled.View`
  margin-bottom: 10px;
`;

export const SubjectTitle = styled.Text`
  margin-bottom: 14px;
  color: #232323;
  font-size: 12px;
  font-weight: 500;
`;

export const Subject = styled.Text`
  margin-bottom: 10px;
  color: #5d5d5d;
  font-size: 12px;
  font-weight: 300;
`;

export const DetailWrapper = styled.View`
  margin-bottom: 13px;
`;

export const Option = styled.Text`
  text-align: center;
  font-size: 12px;
`;

export const WebViewWrapper = styled.View`
  flex: 1;
  height: 300px;
  padding-right: 10px;
  padding-bottom: 10px;
`;
