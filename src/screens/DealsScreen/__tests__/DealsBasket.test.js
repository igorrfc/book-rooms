import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { Subject } from 'rxjs';

import createStoreProvider from 'utils/createStoreProvider';

import StoreContext, {
  initialState,
  sources as defaultSources,
} from 'contexts/StoreContext';
import DealsBasket from '../DealsBasket';

function DealsBasketComponent({ context, props = {} }) {
  const StoreProvider = createStoreProvider(
    StoreContext.Provider,
    context.sources,
    context.state || initialState
  );

  return (
    <StoreProvider>
      <DealsBasket {...props} />
    </StoreProvider>
  );
}

const sources = {
  deals: {
    stream: new Subject(),
    connector: new Subject(),
  },
  dealFilter: {
    stream: new Subject(),
    connector: new Subject(),
  },
  dealsBasket: defaultSources.dealsBasket,
};

const dealsResponse = {
  offers: [
    {
      availableRooms: 2,
      bookURI:
        'https://r.findhotel.net?pid=bks&sid=0d6b5caeb932928d2d4ece6cd9bfc44561d1c02d&oid=b096f5b1b7cbeb0e87cd643b331cadf49f0afe97f5ca855677b5bf6535972cdc:00&lbl=&ofd=book_uri%3Dhttps%253A%252F%252Fwww.booking.com%252Fhotel%252Fus%252Fwyndham-houston-medical-center-and-suites.en-gb.html%253Faid%253D2005135%2526checkin%253D2020-11-21%2526checkout%253D2020-11-22%2526room1%253DA%25252CA%2526selected_currency%253DEUR%2526show_room%253D18259019_246072278_2_2_0',
      canPayLater: true,
      currency: 'EUR',
      hasFreeCancellation: true,
      id: 'b096f5b1b7cbeb0e87cd643b331cadf49f0afe97f5ca855677b5bf6535972cdc:00',
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

describe('DealsBasket', () => {
  it('blocks the body tag scroll when rendered', () => {
    const state = {
      ...initialState,
      deals: {
        data: dealsResponse,
      },
      dealsBasket: {
        data: {
          'b096f5b1b7cbeb0e87cd643b331cadf49f0afe97f5ca855677b5bf6535972cdc:00': 1,
        },
      },
    };

    expect(document.body.style.overflow).toBe('');

    render(<DealsBasketComponent context={{ sources, state }} />);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('updates room total whenever a new deal is added', () => {
    const state = {
      ...initialState,
      deals: {
        data: dealsResponse,
      },
      dealsBasket: {
        data: {
          'b096f5b1b7cbeb0e87cd643b331cadf49f0afe97f5ca855677b5bf6535972cdc:00': 1,
        },
      },
    };

    render(<DealsBasketComponent context={{ sources, state }} />);

    expect(screen.getByText(/1 rooms/i)).toBeInTheDocument();
    expect(screen.getByText(/Total € 88.01/i)).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByTestId('IncrementButton'));
    });

    act(() => {
      fireEvent.click(screen.getByTestId('IncrementButton'));
    });

    expect(screen.getByText(/2 rooms/i)).toBeInTheDocument();
    expect(screen.getByText(/Total € 176.02/i)).toBeInTheDocument();
  });

  describe('deal basket item quantity', () => {
    it('limits the quantity of deals to the maximum of five', () => {
      const state = {
        ...initialState,
        deals: {
          data: dealsResponse,
        },
        dealsBasket: {
          data: {
            'b096f5b1b7cbeb0e87cd643b331cadf49f0afe97f5ca855677b5bf6535972cdc:00': 1,
          },
        },
      };

      render(<DealsBasketComponent context={{ sources, state }} />);

      expect(screen.getByTestId('NumberInput').getAttribute('value')).toBe('1');

      act(() => {
        fireEvent.click(screen.getByTestId('IncrementButton'));
      });
      act(() => {
        fireEvent.click(screen.getByTestId('IncrementButton'));
      });
      act(() => {
        fireEvent.click(screen.getByTestId('IncrementButton'));
      });
      act(() => {
        fireEvent.click(screen.getByTestId('IncrementButton'));
      });
      act(() => {
        fireEvent.click(screen.getByTestId('IncrementButton'));
      });
      act(() => {
        fireEvent.click(screen.getByTestId('IncrementButton'));
      });
      act(() => {
        fireEvent.click(screen.getByTestId('IncrementButton'));
      });

      expect(screen.getByTestId('NumberInput').getAttribute('value')).toBe('5');
    });

    it('removes the deal from the basket when it reaches a quantity of zero deals', () => {
      const state = {
        ...initialState,
        deals: {
          data: dealsResponse,
        },
        dealsBasket: {
          data: {
            'b096f5b1b7cbeb0e87cd643b331cadf49f0afe97f5ca855677b5bf6535972cdc:00': 1,
          },
        },
      };

      render(<DealsBasketComponent context={{ sources, state }} />);

      expect(
        screen.getByText(/Deluxe King Room - Mobility Accessible\/Non-Smoking/i)
      ).toBeInTheDocument();

      act(() => {
        fireEvent.click(screen.getByTestId('DecrementButton'));
      });

      expect(
        screen.queryByText(
          /Deluxe King Room - Mobility Accessible\/Non-Smoking/i
        )
      ).not.toBeInTheDocument();
    });
  });
});
