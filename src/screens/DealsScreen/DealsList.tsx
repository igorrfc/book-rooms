import React from 'react';
import { match } from 'ts-pattern';
import styled from 'styled-components';

import LocaleContext from 'contexts/LocaleContext';

import Nothing from 'components/Nothing';
import { TitleSmall, TextMedium, TitleMedium } from 'components/typography';
import { PrimaryButton } from 'components/buttons';

import { IOfferDetails } from 'selectors/deals';

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

const DealCard = styled.div`
  border-radius: 5px;
  min-height: 300px;
  overflow: hidden;
  box-shadow: 0px 0px 5px 0px rgba(255, 0, 255, 1);
  margin-bottom: 30px;
`;

const RoomImage = styled.div<{ url: string }>`
  background-image: url('${({ url }) => url}');
  background-position: left top;
  background-repeat: no-repeat;
  z-index: 1;
  width: 100%;
  height: 170px;
`;

const Deal = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 5px;
`;

const DetailsText = styled(TextMedium)`
  flex: 5;
`;

const Price = styled(TitleMedium)`
  margin: 0;
  display: flex;
  align-items: center;
`;

const CurrencySymbol = styled.span`
  font-size: 16px;
  font-weight: 700;
  margin-right: 2px;
`;

const NegotiationWrapper = styled.div`
  flex: 5;
  max-width: 95px;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RoomDetails = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3px 10px;
  flex: 8;
  align-items: center;
`;

const AddRoom = styled.div`
  flex: 2;
  display: flex;
`;

const DealType = styled.div`
  background-color: grey;
  padding: 3px;
`;

const DealTypeText = styled(TextMedium)`
  text-align: center;
  overflow: hidden;
  font-size: 10px;
`;

const currencySymbol = {
  [Currency.EUR]: '€',
};

function DealsList({ deals }: Props) {
  const { locale } = React.useContext(LocaleContext);

  return match(deals)
    .with({}, (deals) => (
      <div data-testid="deals">
        {Object.entries(deals as Record<string, IOfferDetails[]>).map(
          ([roomName, availableRooms]) => (
            <div key={roomName}>
              <TitleSmall>{roomName}</TitleSmall>
              <DealCard key={roomName}>
                <RoomImage url={availableRooms[0].roomImages[0]} />
                {(availableRooms as IOfferDetails[])
                  .sort(sortByDetails)
                  .map((room) => (
                    <Deal key={room.id}>
                      <RoomDetails>
                        <DetailsText>
                          {room.details.length > 0
                            ? room.details.map(locale).join(' • ')
                            : null}
                        </DetailsText>
                        <NegotiationWrapper>
                          {room.dealType ? (
                            <DealType>
                              <DealTypeText>
                                {locale(room.dealType)}
                              </DealTypeText>
                            </DealType>
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
                    </Deal>
                  ))}
              </DealCard>
            </div>
          )
        )}
      </div>
    ))
    .otherwise(Nothing);
}

export default DealsList;
