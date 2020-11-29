import enLocale from './en';

const localeConfig: Record<string, Record<string, string>> = {
  en: enLocale,
};

export enum Locale {
  EN = 'en',
}

function getLocale(language: Locale) {
  const dictionary = localeConfig[language];

  if (!dictionary) {
    throw new Error('There is no configuration file for the selected language');
  }

  return (textId: string) => dictionary[textId];
}

export default getLocale;
