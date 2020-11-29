import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Subject, of } from 'rxjs';

import createStoreProvider from '../createStoreProvider';

const StoreContext = React.createContext({});
const createNewProvider = (sources) =>
  createStoreProvider(StoreContext.Provider, sources);

test('subscribes data sources and provides result state to consumers', async () => {
  const fooStream$ = of('Foo Bar');
  const fooConnector$ = new Subject();
  const fooDataSource = { stream: fooStream$, connector: fooConnector$ };
  const sources = { foo: fooDataSource };
  const StateProvider = createNewProvider(sources);

  function StoreConsumer() {
    const { state, sources } = React.useContext(StoreContext);

    function triggerName() {
      sources.foo.stream.subscribe(sources.foo.connector);
    }

    return (
      <>
        <button onClick={triggerName}>Refresh</button>
        <p>{state.foo?.data}</p>
      </>
    );
  }

  render(
    <StateProvider sources={sources}>
      <StoreConsumer />
    </StateProvider>
  );

  expect(screen.queryByText('Foo Bar')).not.toBeInTheDocument();

  fireEvent.click(screen.getByText('Refresh'));

  expect(screen.getByText('Foo Bar')).toBeInTheDocument();
});
