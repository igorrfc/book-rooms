import React from 'react';
import { match, not } from 'ts-pattern';
import styled from 'styled-components';

import LocaleContext from 'contexts/LocaleContext';

import Colors from 'constants/colors';

import { TextMedium, TitleMedium, TitleSmall } from 'components/typography';
import { PrimaryButton } from 'components/buttons';
import ChevronRight from 'components/icons/ChevronRight';

import { isElementOverflown } from 'utils/dom';
import { toFixed } from 'utils/currency';

import { DealType, IOfferDetails } from 'selectors/deals';

import currencySymbol from 'constants/currencySymbol';
import StoreContext from '../../contexts/StoreContext';
import {
  DealsBasketAction,
  DealsBasketMutations,
} from '../../data/sources/dealsBasket';
import { NextObserver, Subject } from 'rxjs';

const sortByDetails = (room: IOfferDetails, nextRoom: IOfferDetails) => {
  if (room.details.length > nextRoom.details.length) {
    return -1;
  }
  if (room.details.length < nextRoom.details.length) {
    return 1;
  }
  return 0;
};

const RoomTitle = styled(TitleSmall)`
  color: ${Colors.EbonyClay};
  margin-bottom: 7px;
`;

const DealContainer = styled.div`
  margin-bottom: 35px;
  position: relative;
`;

const DealCard = styled.div<{ isCollapsed: boolean }>`
  max-height: ${({ isCollapsed }) => (isCollapsed ? '326px' : 'auto')};
  overflow: hidden;
  border-radius: 7px;
  box-shadow: 0 1px 4px 0 rgba(145, 175, 209, 0.24),
    0 0 1px 0 rgba(145, 175, 209, 0.24);
  background-color: ${Colors.TitanWhite};
`;

const RoomImage = styled.div<{ url: string }>`
  background-image: url('${({ url }) => url}');
  background-position: left top;
  background-repeat: no-repeat;
  z-index: 1;
  width: 100%;
  height: 170px;
`;

const DealItem = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 0 8px;
  padding-top: 8px;
  padding-bottom: 8px;

  &:not(:first-child) {
    border-top: 1px solid ${Colors.TropicalBlue};
  }
`;

const DetailsText = styled(TextMedium)`
  flex: 5;
  color: ${Colors.ShuttleGray};
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
`;

const NegotiationWrapper = styled.div<{ dealType: DealType }>`
  flex: 5;
  max-width: 95px;
  color: ${({ dealType }) =>
    match(dealType)
      .with(DealType.Private, () => Colors.PurpleHeart)
      .with(DealType.Negotiation, () => Colors.Tangerine)
      .otherwise(() => Colors.EbonyClay)};
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RoomDetails = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  flex: 8;
  align-items: center;
`;

const AddRoom = styled.div`
  flex: 2;
  display: flex;
`;

const DealTypePill = styled.div<{ dealType: DealType }>`
  border-radius: 2px;
  padding: 2px 1px 2px 2px;
  background-color: ${({ dealType }) =>
    match(dealType)
      .with(DealType.Private, () => Colors.Periwinkle)
      .with(DealType.Negotiation, () => Colors.ColonialWhite)
      .otherwise(() => Colors.ShuttleGray)};
`;

const DealTypeText = styled(TextMedium)`
  text-align: center;
  font-size: 10px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;

const Price = styled(TitleMedium)`
  margin: 0;
  font-weight: 800;
  display: flex;
  align-items: center;
`;

const CurrencySymbol = styled.span`
  font-size: 12px;
  font-weight: 700;
  margin-right: 2px;
  opacity: 0.6;
  line-height: 2px;
`;

const Deals = styled.div<{ isCollapsed: boolean }>`
  max-height: ${({ isCollapsed }) => (isCollapsed ? '156px' : 'auto')};
  padding-bottom: ${({ isCollapsed }) => (isCollapsed ? '0px' : '35px')};
`;

const MoreDeals = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 35px;
  background-color: rgba(255, 255, 255, 0.95);
  border: none;
  outline: inherit;
  box-shadow: 0 1.5px 4px 0 rgba(145, 175, 209, 0.24);
  border-bottom-right-radius: 7px;
  border-bottom-left-radius: 7px;
`;

const MoreDealsText = styled(TextMedium)`
  font-size: 13px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  color: ${Colors.ShuttleGray};
`;

const ChevronIcon = styled(ChevronRight).attrs({
  width: 15,
  height: 17,
})<{ isCollapsed: boolean }>`
  transform: ${({ isCollapsed }) =>
    isCollapsed ? 'rotate(90deg)' : 'rotate(-90deg)'};
  margin-left: 7px;
`;

function Deal({
  roomName,
  availableRooms,
}: {
  roomName: string;
  availableRooms: IOfferDetails[];
}) {
  const [isOverflown, toggleOverflow] = React.useState(false);
  const [isCollapsed, toggleCollapse] = React.useState(true);
  const { locale } = React.useContext(LocaleContext);
  const { sources } = React.useContext(StoreContext);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    match(containerRef)
      .with({ current: not(null) }, (el) => {
        toggleOverflow(isElementOverflown(el.current as HTMLDivElement));
      })
      .otherwise(() => {});
  }, [availableRooms]);

  function toggleCardCollapsing() {
    toggleCollapse(!isCollapsed);
  }

  function addRoomToBasket(id: string) {
    return () => {
      sources.dealsBasket.stream.next({
        action: DealsBasketAction.Increment,
        id,
      });
    };
  }

  return (
    <DealContainer>
      <div>
        <RoomTitle>{roomName}</RoomTitle>
        <DealCard isCollapsed={isCollapsed} key={roomName}>
          <RoomImage url={availableRooms[0].roomImages[0]} />
          <Deals ref={containerRef} isCollapsed={isCollapsed}>
            {(availableRooms as IOfferDetails[])
              .sort(sortByDetails)
              .map((room) => (
                <DealItem key={room.id}>
                  <RoomDetails>
                    <DetailsText>
                      {room.details.length > 0
                        ? room.details.map(locale).join(' • ')
                        : null}
                    </DetailsText>
                    <NegotiationWrapper dealType={room.dealType as DealType}>
                      {room.dealType ? (
                        <DealTypePill dealType={room.dealType}>
                          <DealTypeText>{locale(room.dealType)}</DealTypeText>
                        </DealTypePill>
                      ) : null}

                      <PriceWrapper>
                        <Price>
                          <CurrencySymbol>
                            {currencySymbol[room.currency]}{' '}
                          </CurrencySymbol>
                          {toFixed(room.roomPrice, 2)}
                        </Price>
                      </PriceWrapper>
                    </NegotiationWrapper>
                  </RoomDetails>
                  <AddRoom>
                    <PrimaryButton onClick={addRoomToBasket(room.id)}>
                      Add
                    </PrimaryButton>
                  </AddRoom>
                </DealItem>
              ))}
          </Deals>
        </DealCard>
        {isOverflown ? (
          <MoreDeals onClick={toggleCardCollapsing}>
            <MoreDealsText>More Deals</MoreDealsText>
            <ChevronIcon isCollapsed={isCollapsed} width={15} height={17} />
          </MoreDeals>
        ) : null}
      </div>
    </DealContainer>
  );
}

export default Deal;
