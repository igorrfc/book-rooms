import React from 'react';

import createStoreProvider from 'utils/createStoreProvider';
import DealsScreen from 'screens/DealsScreen';

import StoreContext, { sources, IStoreContext } from './StoreContext';

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
