import React from 'react';
import { Observable, Subject } from 'rxjs';

import { Status } from 'types/storeContext';

type State = Record<string, any>;
type DataSource = { stream: Observable<any>; connector: Subject<any> };

interface Props {
  children: JSX.Element | JSX.Element[];
}

function createStoreProvider<ContextType>(
  ContextProvider: any,
  sources: Record<string, DataSource>
) {
  return function StateProvider({ children }: Props) {
    const [state, setState] = React.useState<State>({});

    React.useEffect(() => {
      const sourcesSubscriptions = Object.entries(sources).map(
        ([sourceName, { connector }]) => {
          return connector.subscribe({
            next: (res) =>
              setState({
                ...state,
                [sourceName]: {
                  ...state[sourceName],
                  status: Status.Success,
                  data: res,
                },
              }),
            error: () =>
              setState({
                ...state,
                [sourceName]: { ...state[sourceName], status: Status.Error },
              }),
          });
        }
      );

      return () =>
        sourcesSubscriptions.forEach((subscription) =>
          subscription.unsubscribe()
        );
    }, [state]);

    const contextValue = React.useMemo(() => ({ state, sources }), [state]);

    return <ContextProvider value={contextValue}>{children}</ContextProvider>;
  };
}

export default createStoreProvider;
