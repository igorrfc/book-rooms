import { Observable, Subject } from 'rxjs';
import { dealsConnector$, dealsStream$ } from './data/sources/deals';
import React from 'react';

export interface IStoreContext {
  state: {
    deals: any;
  };
  sources: {
    deals: { stream: Observable<any>; connector: Subject<any> };
  };
}

export const sources = {
  deals: { stream: dealsStream$, connector: dealsConnector$ },
};

const StoreContext = React.createContext<IStoreContext>({
  state: { deals: {} },
  sources: sources,
});

export default StoreContext;
