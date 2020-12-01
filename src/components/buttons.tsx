import styled from 'styled-components';

import Colors from 'constants/colors';

export const PrimaryButton = styled.button`
  width: 100%;
  height: 100%;
  cursor: pointer;
  font-size: 18px;
  padding: 8px 4px 12px;
  font-weight: 500;
  border: 0;
  transition: all 0.5s;
  border-radius: 4px;
  color: ${Colors.White};
  background-color: ${Colors.AzureRadiance};
  text-align: center;
`;
