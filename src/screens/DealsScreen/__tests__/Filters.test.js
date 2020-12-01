import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import createStoreProvider from 'utils/createStoreProvider';

import StoreContext from 'contexts/StoreContext';
import { LocaleProvider } from 'contexts/LocaleContext';
import {
  dealFilterStream$,
  dealFilterConnector$,
} from 'data/sources/dealFilter';

import Filters from '../Filters';

const initialState = {
  dealFilter: { data: {} },
};

function FiltersComponent() {
  const StoreProvider = createStoreProvider(
    StoreContext.Provider,
    {
      dealFilter: {
        stream: dealFilterStream$,
        connector: dealFilterConnector$,
      },
    },
    initialState
  );

  return (
    <LocaleProvider>
      <StoreProvider>
        <Filters />
      </StoreProvider>
    </LocaleProvider>
  );
}

describe('Filters', () => {
  it('defines the main filters', async () => {
    const { container } = render(<FiltersComponent />);

    expect(container.querySelectorAll('button').length).toBe(3);
    expect(screen.getByTestId('BreakfastFilter')).toBeInTheDocument();
    expect(screen.getByTestId('FreeWifiFilter')).toBeInTheDocument();
    expect(screen.getByTestId('PayLaterFilter')).toBeInTheDocument();
  });

  describe('when some of the available filters is clicked', () => {
    it('sets the filter button style to active', async () => {
      render(<FiltersComponent />);

      expect(
        screen
          .getByTestId('BreakfastFilter')
          .querySelector('circle')
          .getAttribute('fill')
      ).toBe('#fefeff');

      fireEvent.click(screen.getByTestId('BreakfastFilter'));

      expect(
        screen
          .getByTestId('BreakfastFilter')
          .querySelector('circle')
          .getAttribute('fill')
      ).toBe('#4398FA');
    });
  });
});
