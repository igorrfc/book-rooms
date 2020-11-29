import { createSelector } from 'reselect';
import { groupBy, ifElse, pipe, prop, contains } from 'ramda';

import { IOffer, Tags, Meal, Cug, Currency } from 'types/deal';
import { IState } from 'types/storeContext';

const deals = ({ deals }: IState) => deals;

function returnValue(value: any) {
  return () => value;
}

enum DealType {
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

export const groupedDealsByRoom = createSelector(deals, (deals) => {
  if (!deals.data?.offers) return null;

  const groupedOffers = groupBy(
    (offer: IOffer) => offer.roomName,
    deals.data.offers
  );

  const detailsGetters = [
    pipe(
      prop<string, any>('meals'),
      ifElse(
        contains(Meal.Breakfast),
        returnValue('breakfast'),
        returnValue(null)
      )
    ),
    pipe(
      prop<string, any>('cancellationPolicy'),
      prop<string, any>('freeRefundableUntil'),
      ifElse(Boolean, returnValue('room.refundable'), returnValue(null))
    ),
    pipe(
      (offer: IOffer) => offer.tags || [],
      ifElse(
        contains(Tags.Wifi),
        returnValue('room.freeWifi'),
        returnValue(null)
      )
    ),
    pipe(
      prop<string, any>('canPayLater'),
      ifElse(Boolean, returnValue('room.payLater'), returnValue(null))
    ),
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
