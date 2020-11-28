import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Subject } from 'rxjs';

import StateProvider, { StoreContext } from '../StoreProvider';

test('subscribes data sources and provides result state to consumers', async () => {
  const fooStream$ = new Subject();
  const fooDataSource = { stream: fooStream$ };
  const sources = { foo: fooDataSource };

  function StoreConsumer() {
    const { state, sources } = React.useContext(StoreContext);

    return (
      <>
        <button onClick={() => sources.foo.stream.next('Foo Bar')}>
          Refresh
        </button>
        <p>{state.foo}</p>
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
