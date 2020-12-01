import React from 'react';
import { match } from 'ts-pattern';
import styled from 'styled-components';

import LocaleContext from 'contexts/LocaleContext';

import Colors from 'constants/colors';

import Nothing from 'components/Nothing';
import { TitleSmall, TextMedium, TitleMedium } from 'components/typography';
import { PrimaryButton } from 'components/buttons';
import ChevronRight from 'components/icons/ChevronRight';

import { isElementOverflown } from 'utils/dom';

import { DealType, IOfferDetails } from 'selectors/deals';

import { Currency } from '../../types/deal';

interface Props {
  deals: Record<string, IOfferDetails[]> | null;
}

function toFixed(num: number, fixed: number) {
  const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
  //@ts-ignore
  return num.toString().match(re)[0];
}

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
  border-bottom: 1px solid ${Colors.TropicalBlue};
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

const currencySymbol = {
  [Currency.EUR]: '€',
};

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
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    match<HTMLElement | null>(containerRef.current)
      .with({}, (el) => {
        toggleOverflow(isElementOverflown(el));
      })
      .otherwise(() => {});
  }, []);

  function toggleCardCollapsing() {
    toggleCollapse(!isCollapsed);
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
                    <PrimaryButton>Add</PrimaryButton>
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

function DealsList({ deals }: Props) {
  return match(deals)
    .with({}, (deals) => (
      <div data-testid="deals">
        {Object.entries(deals as Record<string, IOfferDetails[]>).map(
          ([roomName, availableRooms]) => (
            <Deal
              key={roomName}
              roomName={roomName}
              availableRooms={availableRooms}
            />
          )
        )}
      </div>
    ))
    .otherwise(Nothing);
}

export default DealsList;
