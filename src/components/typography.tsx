import styled from 'styled-components';

export const TitleBig = styled.h1`
  font-weight: 700;
  margin: 0;
  font-size: 22px;
  line-height: 1.2;
`;

export const TitleMedium = styled.h2`
  font-weight: 700;
  margin: 0;
  font-size: 17px;
`;

export const TitleSmall = styled.h3`
  font-weight: 600;
  margin: 0;
  font-size: 15px;
`;

export const TextMedium = styled.p<{ bold?: boolean }>`
  font-size: 14px;
  margin: 0;

  ${({ bold }) => bold && 'font-weight: 600;'}
`;
