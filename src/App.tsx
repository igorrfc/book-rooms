import React from 'react';

import createStoreProvider from 'utils/createStoreProvider';
import DealsScreen from 'screens/DealsScreen';

import { IStoreContext } from 'types/storeContext';
import StoreContext, { sources } from './StoreContext';

import 'normalize.css';

const StoreProvider = createStoreProvider<IStoreContext>(
  StoreContext.Provider,
  sources
);

function App() {
  return (
    <>
      <StoreProvider>
        <DealsScreen />
      </StoreProvider>
    </>
  );
}

export default App;
