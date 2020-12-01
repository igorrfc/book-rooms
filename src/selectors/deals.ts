import { createSelector } from 'reselect';
import { contains, groupBy, ifElse, pipe, prop } from 'ramda';
import { match } from 'ts-pattern';

import { Cug, Currency, IOffer, Meal, Tags } from 'types/deal';
import { IState } from 'types/storeContext';
import DealFilter from '../types/dealFilter';

function returnValue(value: any) {
  return () => value;
}

function ifHasWifiElse(truthyResult: any, falsyResult: any) {
  return pipe(
    (offer: IOffer) => offer.tags || [],
    ifElse(
      contains(Tags.Wifi),
      returnValue(truthyResult),
      returnValue(falsyResult)
    )
  );
}

function ifCanPayLaterElse(truthyResult: any, falsyResult: any) {
  return pipe(
    prop<string, any>('canPayLater'),
    ifElse(Boolean, returnValue(truthyResult), returnValue(falsyResult))
  );
}

function ifHasBreakfastElse(truthyResult: any, falsyResult: any) {
  return pipe(
    prop<string, any>('meals'),
    ifElse(
      contains(Meal.Breakfast),
      returnValue(truthyResult),
      returnValue(falsyResult)
    )
  );
}

export enum DealType {
  Private = 'room.negotiationDeal.private',
  Negotiation = 'room.negotiationDeal.negotiation',
}

export interface IOfferDetails {
  id: string;
  details: string[];
  dealType: DealType | null;
  roomPrice: number;
  roomImages: string[];
  currency: Currency;
}

const deals = ({ deals }: IState) => deals;
const dealFilter = ({ dealFilter }: IState) => dealFilter;

export const filteredDeals = createSelector(
  deals,
  dealFilter,
  (deals, dealFilter) => {
    const offers = deals.data?.offers || [];
    return match(dealFilter.data)
      .with(DealFilter.PayLater, () =>
        offers.filter(ifCanPayLaterElse(true, false))
      )
      .with(DealFilter.FreeWifi, () =>
        offers.filter(ifHasWifiElse(true, false))
      )
      .with(DealFilter.Breakfast, () =>
        offers.filter(ifHasBreakfastElse(true, false))
      )
      .otherwise(() => offers);
  }
);

export const groupedDealsByRoom = createSelector(filteredDeals, (offers) => {
  const groupedOffers = groupBy((offer: IOffer) => offer.roomName, offers);

  const detailsGetters = [
    ifHasBreakfastElse('breakfast', null),
    pipe(
      prop<string, any>('cancellationPolicy'),
      prop<string, any>('freeRefundableUntil'),
      ifElse(Boolean, returnValue('room.refundable'), returnValue(null))
    ),
    ifHasWifiElse('room.freeWifi', null),
    ifCanPayLaterElse('room.payLater', null),
  ];

  return Object.entries(groupedOffers).reduce<Record<string, IOfferDetails[]>>(
    (offers, [roomName, availableRooms]) => {
      offers[roomName] = availableRooms.map(
        (offer): IOfferDetails => ({
          id: offer.id,
          currency: offer.currency,
          details: detailsGetters
            .map((getter) => getter(offer))
            .filter(Boolean),
          dealType:
            (offer.cug &&
              offer.cug.includes(Cug.Negotiation) &&
              DealType.Negotiation) ||
            (offer.cug &&
              offer.cug.includes(Cug.Private) &&
              DealType.Private) ||
            null,
          roomPrice: Object.values(offer.rateBreakdown).reduce(
            (acc, cur) => acc + cur,
            0
          ),
          roomImages: [
            'https://i.fih.io/_flsJcMCcQ7ViLi97jd0uw2AOWU=/615x340/https%3A%2F%2Fi.travelapi.com%2Fhotels%2F2000000%2F1500000%2F1490100%2F1490044%2F6b7ca3f8_w.jpg',
            'https://i.fih.io/_flsJcMCcQ7ViLi97jd0uw2AOWU=/615x340/https%3A%2F%2Fi.travelapi.com%2Fhotels%2F2000000%2F1500000%2F1490100%2F1490044%2F6b7ca3f8_w.jpg',
          ],
        })
      );

      return offers;
    },
    {}
  );
});
