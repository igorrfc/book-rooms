import React from 'react';
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import { Subject, interval, from, of } from 'rxjs';
import { first } from 'rxjs/operators';

import createStoreProvider from 'utils/createStoreProvider';

import StoreContext, {
  initialState,
  sources as defaultSources,
} from 'contexts/StoreContext';
import Deals from '..';

function DealsScreen({ context, props = {} }) {
  const StoreProvider = createStoreProvider(
    StoreContext.Provider,
    context.sources,
    initialState
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
      dealFilter: {
        stream: of(null),
        connector: new Subject(),
      },
      dealsBasket: {
        stream: of({}),
        connector: new Subject(),
      },
    };

    render(
      <DealsScreen
        context={{ sources, state: { deals: {}, dealFilter: { data: {} } } }}
      />
    );

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
      dealFilter: {
        stream: of(null),
        connector: new Subject(),
      },
      dealsBasket: {
        stream: of({}),
        connector: new Subject(),
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

  describe('deals basket', () => {
    const streamResponse = {
      offers: [
        {
          availableRooms: 2,
          bookURI:
            'https://r.findhotel.net?pid=bks&sid=0d6b5caeb932928d2d4ece6cd9bfc44561d1c02d&oid=b096f5b1b7cbeb0e87cd643b331cadf49f0afe97f5ca855677b5bf6535972cdc:00&lbl=&ofd=book_uri%3Dhttps%253A%252F%252Fwww.booking.com%252Fhotel%252Fus%252Fwyndham-houston-medical-center-and-suites.en-gb.html%253Faid%253D2005135%2526checkin%253D2020-11-21%2526checkout%253D2020-11-22%2526room1%253DA%25252CA%2526selected_currency%253DEUR%2526show_room%253D18259019_246072278_2_2_0',
          canPayLater: true,
          currency: 'EUR',
          hasFreeCancellation: true,
          id:
            'b096f5b1b7cbeb0e87cd643b331cadf49f0afe97f5ca855677b5bf6535972cdc:00',
          integrationType: 'redirect',
          isAnchorPriceOffer: false,
          isCheapest: false,
          isSharedRoom: false,
          isTopOffer: false,
          meals: [],
          providerCode: 'BKS',
          providerHotelId: '182590',
          proxyProviderCode: 'BKS',
          rateBasedOnNumberOfRooms: null,
          rateBreakdown: {
            baseRate: 75.23,
            taxes: 9.78,
            localTaxes: 3,
          },
          roomName: 'Deluxe King Room - Mobility Accessible/Non-Smoking',
          tags: null,
          cug: null,
          cancellationPolicy: {
            freeRefundableUntil: '2020-11-20T05:59:59Z',
            description: '',
          },
        },
      ],
    };

    it('opens the deals basket when a new deal is added', async () => {
      const sources = {
        deals: {
          stream: new Subject(),
          connector: new Subject(),
        },
        dealFilter: {
          stream: of(null),
          connector: new Subject(),
        },
        dealsBasket: defaultSources.dealsBasket,
      };

      render(<DealsScreen context={{ sources, state: initialState }} />);

      act(() => {
        sources.deals.stream.next(streamResponse);
      });

      act(() => {
        fireEvent.click(screen.getByText(/add/i));
      });

      await waitFor(() => {
        expect(screen.queryByTestId('DealsBasket')).toBeInTheDocument();
      });
    });

    it('closes the deals basket when the DealsBasketOverlay is clicked', async () => {
      const sources = {
        deals: {
          stream: new Subject(),
          connector: new Subject(),
        },
        dealFilter: {
          stream: of(null),
          connector: new Subject(),
        },
        dealsBasket: defaultSources.dealsBasket,
      };

      render(<DealsScreen context={{ sources, state: initialState }} />);

      act(() => {
        sources.deals.stream.next(streamResponse);
      });

      act(() => {
        fireEvent.click(screen.getByText(/add/i));
      });

      await waitFor(() => {
        expect(screen.queryByTestId('DealsBasket')).toBeInTheDocument();
      });

      act(() => {
        fireEvent.click(screen.getByTestId('DealsBasketOverlay'));
      });

      await waitFor(() => {
        expect(screen.queryByTestId('DealsBasket')).not.toBeInTheDocument();
      });
    });
  });
});
