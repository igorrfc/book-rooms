import React from 'react';
import { concat, defer } from 'rxjs';
import { match } from 'ts-pattern';
import styled from 'styled-components';

import Colors from 'constants/colors';
import { IStoreContext } from 'types/storeContext';
import { Status } from 'types/storeContext';

import Nothing from 'components/Nothing';
import { TitleMedium, TitleSmall } from 'components/typography';

import { groupedDealsByRoom } from 'selectors/deals';

import DealsList from './DealsList';

import StoreContext from 'contexts/StoreContext';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 2%;
  box-shadow: 0 1px 0 0 rgba(0, 44, 97, 0.1);
  margin-bottom: 17px;
`;

const Container = styled.div`
  padding: 0 5%;
  background-color: ${Colors.White};
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
    <>
      <Header>
        <TitleMedium>All Deals</TitleMedium>
        <HotelName>Doubletree by hilton hotels</HotelName>
      </Header>
      <Container>
        {match({ isLoading, state })
          .with({ isLoading: true }, Loading)
          .with(
            { state: { deals: { status: Status.Success, data: {} } } },
            ({ state }) => <DealsList deals={groupedDealsByRoom(state)} />
          )
          .otherwise(Nothing)}
      </Container>
    </>
  );
}

export default DealsScreen;
