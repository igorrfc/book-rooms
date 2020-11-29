import { dealsConnector$, dealsStream$ } from '../data/sources/deals';
import React from 'react';

import { Status } from 'types/storeContext';
import { IStoreContext } from 'types/storeContext';

export const sources = {
  deals: { stream: dealsStream$, connector: dealsConnector$ },
};

const StoreContext = React.createContext<IStoreContext>({
  state: {
    deals: {
      status: Status.Standby,
      data: undefined,
    },
  },
  sources: sources,
});

export default StoreContext;
