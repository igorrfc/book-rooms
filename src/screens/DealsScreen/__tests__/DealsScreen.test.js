import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { Subject, interval, from } from 'rxjs';
import { first } from 'rxjs/operators';

import createStoreProvider from 'utils/createStoreProvider';

import StoreContext from 'contexts/StoreContext';
import Deals from '..';

function DealsScreen({ context, props = {} }) {
  const StoreProvider = createStoreProvider(
    StoreContext.Provider,
    context.sources
  );

  return (
    <StoreProvider>
      <Deals {...props} />
    </StoreProvider>
  );
}

beforeEach(() => {
  jest.useFakeTimers();
});

describe('DealsScreen', () => {
  it('renders loading state while stream is connecting to source', async () => {
    const connector = new Subject();
    const sources = {
      deals: {
        stream: interval(1000).pipe(first()),
        connector,
      },
    };

    render(<DealsScreen context={{ sources, state: { deals: {} } }} />);

    expect(screen.queryByTestId('loading')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1001);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
  });

  it('renders the offers list when stream successfully loads', async () => {
    const connector = new Subject();
    const streamResponse = { offers: [] };
    const sources = {
      deals: {
        stream: from(new Promise((res) => res(streamResponse))),
        connector,
      },
    };
    const state = {
      deals: {},
    };

    render(<DealsScreen context={{ sources, state }} />);

    await waitFor(() => {
      expect(screen.queryByTestId('deals')).toBeInTheDocument();
    });
  });
});
