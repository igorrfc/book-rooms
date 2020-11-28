import React from 'react';
import { Observable, Subject } from 'rxjs';

type State = Record<string, any>;
type DataSource = { stream: Observable<any>; connector?: Subject<any> };

interface Props {
  children: JSX.Element | JSX.Element[];
  sources: Record<string, DataSource>;
}

export const StoreContext = React.createContext<{
  state: State;
  sources: DataSource | {};
}>({ state: {}, sources: {} });

function StateProvider({ children, sources }: Props) {
  const [state, setState] = React.useState<State>({});

  React.useEffect(() => {
    const sourcesSubscriptions = Object.entries(
      sources
    ).map(([sourceName, { stream }]) =>
      stream.subscribe((result) => setState({ ...state, [sourceName]: result }))
    );

    return () =>
      sourcesSubscriptions.forEach((subscription) =>
        subscription.unsubscribe()
      );
  }, []);

  return (
    <StoreContext.Provider value={{ state, sources }}>
      {children}
    </StoreContext.Provider>
  );
}

export default StateProvider;
