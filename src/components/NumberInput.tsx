import React from 'react';
import styled from 'styled-components';

import Colors from 'constants/colors';

interface Props {
  value: number;
  disableIncrement?: boolean;
  disableDecrement?: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
}

const InputWrapper = styled.div`
  text-align: center;
  display: flex;
  border-radius: 4px;
  border: solid 1px ${Colors.Spindle};
  max-width: 150px;
`;

const IteratorButton = styled.button`
  margin: 0;
  border: 0;
  height: 100%;
  width: 50px;
  text-align: center;
  padding: 11px 0;
  background-color: ${Colors.TitanWhite};
  color: ${Colors.AzureRadiance};
  font-size: 23px;
  font-weight: 18px;
`;

const Input = styled.input`
  border: none;
  border-right: 1px solid ${Colors.Spindle};
  border-left: 1px solid ${Colors.Spindle};
  text-align: center;
  margin: 0px;
  width: 50px;
`;

function NumberInput({
  value = 0,
  onIncrement,
  onDecrement,
  disableIncrement = false,
  disableDecrement = false,
}: Props) {
  return (
    <InputWrapper>
      <IteratorButton disabled={disableDecrement} onClick={onDecrement}>
        -
      </IteratorButton>
      <Input readOnly type="number" value={value} />
      <IteratorButton disabled={disableIncrement} onClick={onIncrement}>
        +
      </IteratorButton>
    </InputWrapper>
  );
}

export default NumberInput;
