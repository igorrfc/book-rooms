import React from 'react';
import styled, { keyframes } from 'styled-components';

import Colors from 'constants/colors';
import NumberInput from 'components/NumberInput';
import StoreContext from 'contexts/StoreContext';
import currencySymbol from 'constants/currencySymbol';

import { TitleBig, TitleMedium, TextMedium } from 'components/typography';
import { PrimaryButton } from 'components/buttons';
import { IStoreContext } from 'types/storeContext';
import { dealsBasketItems, IDealBasketItem } from 'selectors/deals';
import { toFixed } from 'utils/currency';
import { DealsBasketAction } from '../../data/sources/dealsBasket';
import { Currency } from '../../types/deal';

interface Props {
  closeBasket: () => void;
}

const DEALS_LIMIT = 5;

const fadeIn = keyframes`
 from {
        opacity: 0
    }

    to {
        opacity: 0.7
    }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const BackgroundOverlay = styled.div`
  z-index: 1;
  display: block;
  opacity: 0;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #002c61;
  animation: ${fadeIn} 400ms ease-in-out 0s both;
`;

const BasketContainer = styled.div`
  width: 100%;
  background-color: ${Colors.White};
  padding: 15px 0;
  z-index: 2;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Basket = styled.div`
  min-height: 180px;
  max-height: 180px;
  overflow-y: scroll;
  background-image: linear-gradient(to bottom, #f7fbff, #ffffff);
  width: 100%;
  margin-bottom: 22px;
  border-top: 1px solid ${Colors.TropicalBlue};
  border-bottom: 1px solid ${Colors.TropicalBlue};
`;

const BasketItemContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  padding: 20px 0px;
  margin: 0 5%;
  align-items: center;

  &:not(:first-child) {
    border-top: 1px solid ${Colors.TropicalBlue};
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  flex: 6;
`;

const ItemQty = styled.div`
  flex: 4;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const StrongText = styled(TitleMedium)`
  color: ${Colors.EbonyClay};
  width: 130px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemPriceAndQty = styled(TextMedium)`
  color: ${Colors.ShuttleGray};
`;

const BasketTitle = styled(TitleBig)`
  margin-bottom: 14px;
`;

const Image = styled.div`
  height: 40px;
  width: 40px;
  background-color: black;
  margin-right: 12px;
  border-radius: 4px;
`;

const SubmissionDetails = styled.div`
  width: 100%;
  background-color: ${Colors.White};
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const SubmissionOverview = styled.div`
  display: flex;
  flex: 5;
  flex-direction: column;
  padding-left: 5%;
`;

const SubmitContainer = styled.div`
  flex: 5;
  padding-right: 5%;
`;

const SubmissionTotal = styled(TextMedium)`
  color: ${Colors.ShuttleGray};
`;

function BasketItem({ deal }: { deal: IDealBasketItem }) {
  const {
    sources: { dealsBasket },
  } = React.useContext<IStoreContext>(StoreContext);

  const onIncrement = React.useCallback(() => {
    dealsBasket.stream.next({
      id: deal.id,
      action: DealsBasketAction.Increment,
    });
  }, []);

  const onDecrement = React.useCallback(() => {
    dealsBasket.stream.next({
      id: deal.id,
      action: DealsBasketAction.Decrement,
    });
  }, []);

  return (
    <BasketItemContainer>
      <Item>
        <Image />
        <ItemDetails>
          <StrongText>{deal.name}</StrongText>
          <ItemPriceAndQty>
            {deal.qty} x {currencySymbol[deal.currency]}{' '}
            {toFixed(deal.price, 2)}
          </ItemPriceAndQty>
        </ItemDetails>
      </Item>

      <ItemQty>
        <NumberInput
          value={deal.qty}
          disableIncrement={deal.qty === DEALS_LIMIT}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      </ItemQty>
    </BasketItemContainer>
  );
}

function DealsBasket({ closeBasket }: Props) {
  const { state } = React.useContext<IStoreContext>(StoreContext);
  const dealsList = dealsBasketItems(state);
  const roomsTotal = dealsList.reduce((acc, deal) => deal.qty + acc, 0);
  const totalPrice = dealsList.reduce(
    (acc, deal) => deal.qty * deal.price + acc,
    0
  );
  const currentCurrency =
    currencySymbol[dealsList[0]?.currency] || currencySymbol[Currency.EUR];

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <Container data-test-id="DealsBasket">
      <BackgroundOverlay onClick={closeBasket} />

      <BasketContainer>
        <BasketTitle>Room Selection</BasketTitle>
        <Basket>
          {dealsList.map((deal) => (
            <BasketItem key={deal.id} deal={deal} />
          ))}
        </Basket>
        <SubmissionDetails>
          <SubmissionOverview>
            <StrongText>{roomsTotal} rooms</StrongText>
            <SubmissionTotal>
              Total {currentCurrency} {toFixed(totalPrice, 2)}
            </SubmissionTotal>
          </SubmissionOverview>
          <SubmitContainer>
            <PrimaryButton disabled={dealsList.length === 0}>
              Book
            </PrimaryButton>
          </SubmitContainer>
        </SubmissionDetails>
      </BasketContainer>
    </Container>
  );
}

export default DealsBasket;
