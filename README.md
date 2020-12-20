# Book Rooms app

![Trades Manager](https://user-images.githubusercontent.com/7783787/102716518-29a61580-42bb-11eb-8bd7-99b391b43e58.png)

## Prerequisites
- **Node version**: v12.18.3
- **Yarn version**: 1.22.5

## Initial setup

```sh
yarn install
```

## Start the server

```sh
yarn start
```

## Run tests

```sh
yarn test
```

### Architecture/tooling details

* [x] UI built with React
* [x] State management made with a mix of React.Context API and RxJS
* [x] Tests with Jest and testing-library/react

### Folder Structure

This is an overview of some of the core project's folders:
```
book-rooms/
  src/
    components/
    constants/
    contexts/
        LocaleContext.ts
        StoreContext.ts
    data/
        sources/
    screens/
    selectors/
    types/
```

**When should I use those folders?**
* **components/**: Here you will place the reusable (a.k.a generic) components;
* **constants/**: Here you will store the constants you need to use in different places;
* **contexts/**: This is the folder responsible to store the react contexts used throughout the app. The main ones are the LocaleContext (responsible for giving the components a translation function) and the StoreContext (giving components access to the global state);
* **data/sources/**: This directory stores the most important asset we consume on the app: the **data**. Here is the place to store whatever data source the app will consume: be it a ajax request to a specific endpoint, an object which will be used to represent a domain state, and the list goes on...;
* **screens**: Here are the screens of the app;
* **selectors**: Selectors are the main way to connect to store and pipe the data on a human-friendly shape to the components. The data will be stored on StoreContext on the most raw form as possible, selectors are the ones responsible to deliver it in a way it'll be useful for your users.
* **types**: Here you'll store the typings for the data you're handling in the app ;)

