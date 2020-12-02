import React from 'react';
import { defer, concat } from 'rxjs';
import { match, __ } from 'ts-pattern';
import styled from 'styled-components';

import Colors from 'constants/colors';
import { IStoreContext } from 'types/storeContext';
import { Status } from 'types/storeContext';

import Nothing from 'components/Nothing';
import { TitleMedium, TitleSmall } from 'components/typography';

import { groupedDealsByRoom, IOfferDetails } from 'selectors/deals';
import StoreContext from 'contexts/StoreContext';

import Deal from './Deal';
import Filters from './Filters';
import {
  DealsBasketAction,
  DealsBasketMutations,
} from '../../data/sources/dealsBasket';
import DealsBasket from './DealsBasket';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 2%;
  box-shadow: 0 1px 0 0 rgba(0, 44, 97, 0.1);
`;

const Container = styled.div`
  padding: 0 5%;
  background-color: ${Colors.White};
`;

const FiltersContainer = styled.div`
  margin-bottom: 17px;
`;

const HotelName = styled(TitleSmall)`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.55;
  letter-spacing: normal;
  text-align: center;
  color: #a3acb8;
`;

function Loading() {
  return <h1 data-testid="loading">Loading...</h1>;
}

function DealsList({
  deals,
}: {
  deals: Record<string, IOfferDetails[]> | null;
}) {
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

function DealsScreen() {
  const { sources, state } = React.useContext<IStoreContext>(StoreContext);
  const [isLoading, toggleLoading] = React.useState(false);
  const [isDealsBasketOpen, toggleDealsBasketVisibility] = React.useState(
    false
  );

  const closeBasket = React.useCallback(() => {
    toggleDealsBasketVisibility(false);
  }, []);

  React.useEffect(() => {
    const connectorSub = sources.deals.connector.subscribe({
      next: () => toggleLoading(false),
    });

    const streamSub = concat(
      defer(() => toggleLoading(true)),
      sources.deals.stream
    ).subscribe(sources.deals.connector);

    return () => {
      connectorSub.unsubscribe();
      streamSub.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    const dealsBasketSub = sources.dealsBasket.stream.subscribe({
      next: ({ action }: DealsBasketMutations) => {
        if (!isDealsBasketOpen && action === DealsBasketAction.Increment) {
          toggleDealsBasketVisibility(true);
        }
      },
    });

    return () => dealsBasketSub.unsubscribe();
  }, [isDealsBasketOpen]);

  return (
    <>
      <Header>
        <TitleMedium>All Deals</TitleMedium>
        <HotelName>Doubletree by hilton hotels</HotelName>
      </Header>
      <FiltersContainer>
        <Filters />
      </FiltersContainer>
      <Container>
        {match({ isLoading, state })
          .with({ isLoading: true }, Loading)
          .with(
            {
              state: {
                deals: { status: Status.Success, data: { offers: __ } },
              },
            },
            ({ state }) => <DealsList deals={groupedDealsByRoom(state)} />
          )
          .otherwise(Nothing)}
      </Container>

      {isDealsBasketOpen ? <DealsBasket closeBasket={closeBasket} /> : null}
    </>
  );
}

export default DealsScreen;
