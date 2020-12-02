import React from 'react';
import { Observable, Subject } from 'rxjs';

import { Status } from 'types/storeContext';

type State = Record<string, any>;
type DataSource = {
  stream: Observable<any> | Subject<any>;
  connector: Observable<any> | Subject<any>;
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

const stateOracle = new Subject<{ sourceName: string; result: any }>();

function createStoreProvider<ContextType>(
  ContextProvider: any,
  sources: Record<string, DataSource>,
  initialState: Record<string, any> = {}
) {
  return function StateProvider({ children }: Props) {
    const [state, setState] = React.useState<State>(initialState);

    React.useEffect(() => {
      const sourcesSubscriptions = Object.entries(sources).map(
        ([sourceName, { connector }]) => {
          return connector.subscribe({
            next: (result) => stateOracle.next({ sourceName, result }),
            error: () => stateOracle.error({ sourceName }),
          });
        }
      );

      return () =>
        sourcesSubscriptions.forEach((subscription) =>
          subscription.unsubscribe()
        );
    }, []);

    React.useEffect(() => {
      const stateOracleSub = stateOracle.subscribe({
        next: ({ sourceName, result }) =>
          setState({
            ...state,
            [sourceName]: {
              ...state[sourceName],
              status: Status.Success,
              data: result,
            },
          }),
        error: ({ sourceName }) =>
          setState({
            ...state,
            [sourceName]: { ...state[sourceName], status: Status.Error },
          }),
      });

      return () => stateOracleSub.unsubscribe();
    }, [state]);

    const contextValue = React.useMemo(() => ({ state, sources }), [state]);

    return <ContextProvider value={contextValue}>{children}</ContextProvider>;
  };
}

export default createStoreProvider;
