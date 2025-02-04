import React from 'react';

import createStoreProvider from 'utils/createStoreProvider';
import DealsScreen from 'screens/DealsScreen';

import { IStoreContext } from 'types/storeContext';
import StoreContext, { sources, initialState } from 'contexts/StoreContext';
import { LocaleProvider } from 'contexts/LocaleContext';

import 'normalize.css';

const StoreProvider = createStoreProvider<IStoreContext>(
  StoreContext.Provider,
  sources,
  initialState
);

function App() {
  return (
    <>
      <StoreProvider>
        <LocaleProvider>
          <DealsScreen />
        </LocaleProvider>
      </StoreProvider>
    </>
  );
}

export default App;
