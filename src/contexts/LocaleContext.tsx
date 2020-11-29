import React from 'react';

import getLocale, { Locale } from 'utils/locale';

interface ILocaleContext {
  localeValue: Locale;
  setLocale: (locale: Locale) => void;
  locale: (message: string) => string;
}

const LocaleContext = React.createContext<ILocaleContext>({
  localeValue: Locale.EN,
  setLocale: () => {},
  locale: () => '',
});

export function LocaleProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [localeValue, setLocale] = React.useState(Locale.EN);

  const contextValue = React.useMemo(
    () => ({
      localeValue,
      setLocale,
      locale: getLocale(localeValue),
    }),
    [localeValue]
  );

  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
}

export default LocaleContext;
