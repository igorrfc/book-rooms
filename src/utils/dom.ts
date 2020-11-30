export const isElementOverflown = ({
  clientHeight,
  scrollHeight,
}: {
  clientHeight: number;
  scrollHeight: number;
}) => scrollHeight > clientHeight;
