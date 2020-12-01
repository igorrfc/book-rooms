import React from 'react';

import { Status } from 'types/storeContext';
import { IStoreContext } from 'types/storeContext';

import { dealsConnector$, dealsStream$ } from 'data/sources/deals';
import {
  dealFilterConnector$,
  dealFilterStream$,
} from 'data/sources/dealFilter';

export const sources = {
  deals: { stream: dealsStream$, connector: dealsConnector$ },
  dealFilter: { stream: dealFilterStream$, connector: dealFilterConnector$ },
};

export const initialState = {
  deals: {
    status: Status.Standby,
    data: undefined,
  },
  dealFilter: {
    status: Status.Standby,
    data: undefined,
  },
};

const StoreContext = React.createContext<IStoreContext>({
  state: initialState,
  sources: sources,
});

export default StoreContext;
