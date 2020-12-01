import React from 'react';
import styled from 'styled-components';

import LocaleContext from 'contexts/LocaleContext';
import StoreContext from 'contexts/StoreContext';

import Colors from 'constants/colors';

import Breakfast from 'components/icons/Breakfast';
import Wifi from 'components/icons/Wifi';
import PayLater from 'components/icons/PayLater';
import { TextMedium } from 'components/typography';
import { IStoreContext } from 'types/storeContext';
import DealFilter from 'types/dealFilter';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 rgba(0, 44, 97, 0.1);
  padding-top: 4px;
  flex-direction: column;
  overflow-x: scroll;
`;

const Options = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
`;

const Option = styled.button`
  margin-left: 20px;
  border: 0;
  background-color: transparent;
  outline-color: #07f;
`;

const OptionName = styled(TextMedium)`
  color: ${Colors.AzureRadiance};
  font-size: 10px;
  font-weight: 600;
`;

const Title = styled(TextMedium)`
  color: ${Colors.HitGray};
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 500;
`;

const iconColors = {
  active: {
    fillColor: Colors.DodgerBlue,
    strokeColor: Colors.White,
    balloonStrokeColor: '#07F',
  },
  inactive: {
    fillColor: Colors.TitanWhite,
    strokeColor: Colors.AzureRadiance,
    balloonStrokeColor: Colors.Spindle,
  },
};

function Filters() {
  const { locale } = React.useContext(LocaleContext);
  const {
    state: {
      dealFilter: { data: selectedDealFilter },
    },
    sources: { dealFilter },
  } = React.useContext<IStoreContext>(StoreContext);

  React.useEffect(() => {
    dealFilter.stream.subscribe(dealFilter.connector);
  }, []);

  function toggleFilter(newFilter: DealFilter) {
    return () =>
      dealFilter.stream.next(
        newFilter === selectedDealFilter ? undefined : newFilter
      );
  }

  return (
    <Container>
      <Title>{locale('filters')}</Title>
      <Options>
        <Option
          data-testid="BreakfastFilter"
          onClick={toggleFilter(DealFilter.Breakfast)}
        >
          <Breakfast
            {...iconColors[
              selectedDealFilter === DealFilter.Breakfast
                ? 'active'
                : 'inactive'
            ]}
          />
          <OptionName>{locale('breakfast')}</OptionName>
        </Option>
        <Option
          data-testid="FreeWifiFilter"
          onClick={toggleFilter(DealFilter.FreeWifi)}
        >
          <Wifi
            {...iconColors[
              selectedDealFilter === DealFilter.FreeWifi ? 'active' : 'inactive'
            ]}
          />
          <OptionName>{locale('room.freeWifi')}</OptionName>
        </Option>
        <Option
          data-testid="PayLaterFilter"
          onClick={toggleFilter(DealFilter.PayLater)}
        >
          <PayLater
            {...iconColors[
              selectedDealFilter === DealFilter.PayLater ? 'active' : 'inactive'
            ]}
          />
          <OptionName>{locale('room.payLater')}</OptionName>
        </Option>
      </Options>
    </Container>
  );
}

export default Filters;
