import React from 'react';
import { concat, defer } from 'rxjs';
import { match } from 'ts-pattern';
import styled from 'styled-components';

import { IStoreContext } from 'types/storeContext';
import { Status } from 'types/storeContext';

import Nothing from 'components/Nothing';
import { TitleSmall, TextMedium } from 'components/typography';

import { groupedDealsByRoom } from 'selectors/deals';

import DealsList from './DealsList';

import StoreContext from 'contexts/StoreContext';

const Container = styled.div`
  padding: 0 5%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 2%;
`;

const HotelName = styled(TextMedium)`
  text-transform: uppercase;
`;

function Loading() {
  return <h1 data-testid="loading">Loading...</h1>;
}

function DealsScreen() {
  const { sources, state } = React.useContext<IStoreContext>(StoreContext);
  const [isLoading, toggleLoading] = React.useState(false);

  React.useEffect(() => {
    const connectorSub = sources.deals.connector.subscribe({
      complete: () => toggleLoading(false),
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

  return (
    <Container>
      <Header>
        <TitleSmall>All Deals</TitleSmall>
        <HotelName>Doubletree by hilton hotels</HotelName>
      </Header>
      {match({ isLoading, state })
        .with({ isLoading: true }, Loading)
        .with(
          { state: { deals: { status: Status.Success, data: {} } } },
          ({ state }) => <DealsList deals={groupedDealsByRoom(state)} />
        )
        .otherwise(Nothing)}
    </Container>
  );
}

export default DealsScreen;
