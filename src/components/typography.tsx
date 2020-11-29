import React from 'react';
import styled from 'styled-components';

const BASE_SIZE = 4;

const BaseTitle = styled.p`
  font-weight: 700;
  margin: 0;
`;

export const TitleMedium = styled(BaseTitle)`
  font-size: ${BASE_SIZE * 6}px;
`;

export const TitleSmall = styled(BaseTitle)`
  font-size: ${BASE_SIZE * 4}px;
`;

export const TextMedium = styled.p<{ bold?: boolean }>`
  font-size: ${BASE_SIZE * 3.4}px;
  margin: 0;

  ${({ bold }) => bold && 'font-weight: 600;'}
`;
