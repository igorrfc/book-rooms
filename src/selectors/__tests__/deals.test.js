import { groupedDealsByRoom } from '../deals';

describe('deals selectors', () => {
  describe('groupedDealsByRoom', () => {
    it('returns rooms grouped by name', () => {
      const state = {
        deals: {
          data: {
            offers: [
              {
                availableRooms: 2,
                bookURI:
                  'https://r.findhotel.net?pid=ian&sid=0d6b5caeb932928d2d4ece6cd9bfc44561d1c02d&oid=e9c3f14241544d25cb53aa14cf2dc2efaa42268e5c41302b5ca4c17c14680b1c:00&lbl=&ofd=book_uri%3Dcampaign_reference%253D%2526destination%253Dhttps%25253A%25252F%25252Fie.hotels.com%25252Fsearch.do%25253Fmpd%25253DEUR%252526cur%25253DEUR%252526q-check-out%25253D2020-11-22%252526mpe%25253D1603299050%252526mph%25253D0%252526q-check-in%25253D2020-11-21%252526locale%25253Den_IE%252526f-hotel-id%25253D149471%252526destination-id%25253D12508675%252526pos%25253DHCOM_IE%252526q-rooms%25253D1%252526q-room-0-adults%25253D2%252526rateplanid%25253D226102851%252526mpb%25253D12.79%252526mpa%25253D75.24%252526cur%25253DEUR%252526rffrid%25253Dtms.hcom.NL.010.001.01.000.000',
                canPayLater: true,
                currency: 'EUR',
                hasFreeCancellation: true,
                id:
                  'e9c3f14241544d25cb53aa14cf2dc2efaa42268e5c41302b5ca4c17c14680b1c:00',
                integrationType: 'redirect',
                isAnchorPriceOffer: false,
                isCheapest: false,
                isSharedRoom: false,
                isTopOffer: false,
                meals: ['breakfast'],
                providerCode: 'IAN',
                providerHotelId: '149471',
                proxyProviderCode: 'IAN',
                rateBasedOnNumberOfRooms: null,
                rateBreakdown: {
                  baseRate: 75.24,
                  taxes: 12.79,
                  localTaxes: 0,
                },
                roomName: 'Deluxe Room, 1 King Bed, Accessible, Non Smoking',
                tags: null,
                cug: null,
                cancellationPolicy: {
                  freeRefundableUntil: null,
                  description: '',
                },
              },
              {
                availableRooms: 2,
                bookURI:
                  'https://r.findhotel.net?pid=ian&sid=0d6b5caeb932928d2d4ece6cd9bfc44561d1c02d&oid=e15c943b8f7197c1cb41799fb4dd2fe8f987444ceb30afdc943cca1bf81bbae2:00&lbl=&ofd=book_uri%3Dcampaign_reference%253D%2526destination%253Dhttps%25253A%25252F%25252Fie.hotels.com%25252Fsearch.do%25253Fmpd%25253DEUR%252526cur%25253DEUR%252526q-check-out%25253D2020-11-22%252526mpe%25253D1603299050%252526mph%25253D0%252526q-check-in%25253D2020-11-21%252526locale%25253Den_IE%252526f-hotel-id%25253D149471%252526destination-id%25253D12508675%252526pos%25253DHCOM_IE%252526q-rooms%25253D1%252526q-room-0-adults%25253D2%252526rateplanid%25253D226102851%252526mpb%25253D12.78%252526mpa%25253D75.24%252526cur%25253DEUR%252526rffrid%25253Dtms.hcom.NL.010.001.01.000.000',
                canPayLater: false,
                currency: 'EUR',
                hasFreeCancellation: true,
                id:
                  'e15c943b8f7197c1cb41799fb4dd2fe8f987444ceb30afdc943cca1bf81bbae2:00',
                integrationType: 'redirect',
                isAnchorPriceOffer: false,
                isCheapest: false,
                isSharedRoom: false,
                isTopOffer: true,
                meals: [],
                providerCode: 'IAN',
                providerHotelId: '149471',
                proxyProviderCode: 'IAN',
                rateBasedOnNumberOfRooms: null,
                rateBreakdown: {
                  baseRate: 75.24,
                  taxes: 12.78,
                  localTaxes: 0,
                },
                roomName: 'Deluxe Room, 1 King Bed, Accessible, Non Smoking',
                tags: ['top_offer'],
                cug: null,
                cancellationPolicy: {
                  freeRefundableUntil: null,
                  description: '',
                },
              },
              {
                availableRooms: 9,
                bookURI:
                  'https://r.findhotel.net?pid=bks&sid=0d6b5caeb932928d2d4ece6cd9bfc44561d1c02d&oid=20119d29ad49aab46c7e016ed356c9a4027558ad4045a84facce17913e870369:00&lbl=&ofd=book_uri%3Dhttps%253A%252F%252Fwww.booking.com%252Fhotel%252Fus%252Fwyndham-houston-medical-center-and-suites.en-gb.html%253Faid%253D2005135%2526checkin%253D2020-11-21%2526checkout%253D2020-11-22%2526room1%253DA%25252CA%2526selected_currency%253DEUR%2526show_room%253D18259034_246072278_2_2_0',
                canPayLater: true,
                currency: 'EUR',
                hasFreeCancellation: true,
                id:
                  '20119d29ad49aab46c7e016ed356c9a4027558ad4045a84facce17913e870369:00',
                integrationType: 'redirect',
                isAnchorPriceOffer: false,
                isCheapest: true,
                isSharedRoom: false,
                isTopOffer: true,
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
                roomName: 'Deluxe Queen Room with Two Queen Beds - Non Smoking',
                tags: ['top_offer', 'cheapest_offer'],
                cug: null,
                cancellationPolicy: {
                  freeRefundableUntil: '2020-11-20T05:59:59Z',
                  description: '',
                },
              },
            ],
          },
        },
      };

      expect(Object.keys(groupedDealsByRoom(state))).toEqual([
        'Deluxe Room, 1 King Bed, Accessible, Non Smoking',
        'Deluxe Queen Room with Two Queen Beds - Non Smoking',
      ]);
    });

    it('returns bookPrice calculated by summing all rates', () => {
      const state = {
        deals: {
          data: {
            offers: [
              {
                availableRooms: 2,
                bookURI:
                  'https://r.findhotel.net?pid=ian&sid=0d6b5caeb932928d2d4ece6cd9bfc44561d1c02d&oid=e9c3f14241544d25cb53aa14cf2dc2efaa42268e5c41302b5ca4c17c14680b1c:00&lbl=&ofd=book_uri%3Dcampaign_reference%253D%2526destination%253Dhttps%25253A%25252F%25252Fie.hotels.com%25252Fsearch.do%25253Fmpd%25253DEUR%252526cur%25253DEUR%252526q-check-out%25253D2020-11-22%252526mpe%25253D1603299050%252526mph%25253D0%252526q-check-in%25253D2020-11-21%252526locale%25253Den_IE%252526f-hotel-id%25253D149471%252526destination-id%25253D12508675%252526pos%25253DHCOM_IE%252526q-rooms%25253D1%252526q-room-0-adults%25253D2%252526rateplanid%25253D226102851%252526mpb%25253D12.79%252526mpa%25253D75.24%252526cur%25253DEUR%252526rffrid%25253Dtms.hcom.NL.010.001.01.000.000',
                canPayLater: true,
                currency: 'EUR',
                hasFreeCancellation: true,
                id:
                  'e9c3f14241544d25cb53aa14cf2dc2efaa42268e5c41302b5ca4c17c14680b1c:00',
                integrationType: 'redirect',
                isAnchorPriceOffer: false,
                isCheapest: false,
                isSharedRoom: false,
                isTopOffer: false,
                meals: ['breakfast'],
                providerCode: 'IAN',
                providerHotelId: '149471',
                proxyProviderCode: 'IAN',
                rateBasedOnNumberOfRooms: null,
                rateBreakdown: {
                  baseRate: 75.24,
                  taxes: 12.79,
                  localTaxes: 0,
                },
                roomName: 'Deluxe Room, 1 King Bed, Accessible, Non Smoking',
                tags: [],
                cug: ['negotiation'],
                cancellationPolicy: {
                  freeRefundableUntil: '2020-11-18T18:00:00Z',
                  description: '',
                },
              },
            ],
          },
        },
      };

      expect(
        groupedDealsByRoom(state)[
          'Deluxe Room, 1 King Bed, Accessible, Non Smoking'
        ][0].roomPrice
      ).toBe(88.03);
    });

    describe('offer details', () => {
      it('returns free wifi if offer tags contains wifi', () => {
        const state = {
          deals: {
            data: {
              offers: [
                {
                  availableRooms: 2,
                  bookURI:
                    'https://r.findhotel.net?pid=ian&sid=0d6b5caeb932928d2d4ece6cd9bfc44561d1c02d&oid=e9c3f14241544d25cb53aa14cf2dc2efaa42268e5c41302b5ca4c17c14680b1c:00&lbl=&ofd=book_uri%3Dcampaign_reference%253D%2526destination%253Dhttps%25253A%25252F%25252Fie.hotels.com%25252Fsearch.do%25253Fmpd%25253DEUR%252526cur%25253DEUR%252526q-check-out%25253D2020-11-22%252526mpe%25253D1603299050%252526mph%25253D0%252526q-check-in%25253D2020-11-21%252526locale%25253Den_IE%252526f-hotel-id%25253D149471%252526destination-id%25253D12508675%252526pos%25253DHCOM_IE%252526q-rooms%25253D1%252526q-room-0-adults%25253D2%252526rateplanid%25253D226102851%252526mpb%25253D12.79%252526mpa%25253D75.24%252526cur%25253DEUR%252526rffrid%25253Dtms.hcom.NL.010.001.01.000.000',
                  canPayLater: true,
                  currency: 'EUR',
                  hasFreeCancellation: true,
                  id:
                    'e9c3f14241544d25cb53aa14cf2dc2efaa42268e5c41302b5ca4c17c14680b1c:00',
                  integrationType: 'redirect',
                  isAnchorPriceOffer: false,
                  isCheapest: false,
                  isSharedRoom: false,
                  isTopOffer: false,
                  meals: ['breakfast'],
                  providerCode: 'IAN',
                  providerHotelId: '149471',
                  proxyProviderCode: 'IAN',
                  rateBasedOnNumberOfRooms: null,
                  rateBreakdown: {
                    baseRate: 75.24,
                    taxes: 12.79,
                    localTaxes: 0,
                  },
                  roomName: 'Deluxe Room, 1 King Bed, Accessible, Non Smoking',
                  tags: ['wifi'],
                  cug: null,
                  cancellationPolicy: {
                    freeRefundableUntil: null,
                    description: '',
                  },
                },
              ],
            },
          },
        };

        expect(
          groupedDealsByRoom(state)[
            'Deluxe Room, 1 King Bed, Accessible, Non Smoking'
          ][0].details
        ).toContain('room.freeWifi');
      });

      it('returns refundable if offer has freeRefundableUntil', () => {
        const state = {
          deals: {
            data: {
              offers: [
                {
                  availableRooms: 2,
                  bookURI:
                    'https://r.findhotel.net?pid=ian&sid=0d6b5caeb932928d2d4ece6cd9bfc44561d1c02d&oid=e9c3f14241544d25cb53aa14cf2dc2efaa42268e5c41302b5ca4c17c14680b1c:00&lbl=&ofd=book_uri%3Dcampaign_reference%253D%2526destination%253Dhttps%25253A%25252F%25252Fie.hotels.com%25252Fsearch.do%25253Fmpd%25253DEUR%252526cur%25253DEUR%252526q-check-out%25253D2020-11-22%252526mpe%25253D1603299050%252526mph%25253D0%252526q-check-in%25253D2020-11-21%252526locale%25253Den_IE%252526f-hotel-id%25253D149471%252526destination-id%25253D12508675%252526pos%25253DHCOM_IE%252526q-rooms%25253D1%252526q-room-0-adults%25253D2%252526rateplanid%25253D226102851%252526mpb%25253D12.79%252526mpa%25253D75.24%252526cur%25253DEUR%252526rffrid%25253Dtms.hcom.NL.010.001.01.000.000',
                  canPayLater: true,
                  currency: 'EUR',
                  hasFreeCancellation: true,
                  id:
                    'e9c3f14241544d25cb53aa14cf2dc2efaa42268e5c41302b5ca4c17c14680b1c:00',
                  integrationType: 'redirect',
                  isAnchorPriceOffer: false,
                  isCheapest: false,
                  isSharedRoom: false,
                  isTopOffer: false,
                  meals: ['breakfast'],
                  providerCode: 'IAN',
                  providerHotelId: '149471',
                  proxyProviderCode: 'IAN',
                  rateBasedOnNumberOfRooms: null,
                  rateBreakdown: {
                    baseRate: 75.24,
                    taxes: 12.79,
                    localTaxes: 0,
                  },
                  roomName: 'Deluxe Room, 1 King Bed, Accessible, Non Smoking',
                  tags: [],
                  cug: null,
                  cancellationPolicy: {
                    freeRefundableUntil: '2020-11-18T18:00:00Z',
                    description: '',
                  },
                },
              ],
            },
          },
        };

        expect(
          groupedDealsByRoom(state)[
            'Deluxe Room, 1 King Bed, Accessible, Non Smoking'
          ][0].details
        ).toContain('room.refundable');
      });

      it('returns breakfast if offer meals contains breakfast', () => {
        const state = {
          deals: {
            data: {
              offers: [
                {
                  availableRooms: 2,
                  bookURI:
                    'https://r.findhotel.net?pid=ian&sid=0d6b5caeb932928d2d4ece6cd9bfc44561d1c02d&oid=e9c3f14241544d25cb53aa14cf2dc2efaa42268e5c41302b5ca4c17c14680b1c:00&lbl=&ofd=book_uri%3Dcampaign_reference%253D%2526destination%253Dhttps%25253A%25252F%25252Fie.hotels.com%25252Fsearch.do%25253Fmpd%25253DEUR%252526cur%25253DEUR%252526q-check-out%25253D2020-11-22%252526mpe%25253D1603299050%252526mph%25253D0%252526q-check-in%25253D2020-11-21%252526locale%25253Den_IE%252526f-hotel-id%25253D149471%252526destination-id%25253D12508675%252526pos%25253DHCOM_IE%252526q-rooms%25253D1%252526q-room-0-adults%25253D2%252526rateplanid%25253D226102851%252526mpb%25253D12.79%252526mpa%25253D75.24%252526cur%25253DEUR%252526rffrid%25253Dtms.hcom.NL.010.001.01.000.000',
                  canPayLater: true,
                  currency: 'EUR',
                  hasFreeCancellation: true,
                  id:
                    'e9c3f14241544d25cb53aa14cf2dc2efaa42268e5c41302b5ca4c17c14680b1c:00',
                  integrationType: 'redirect',
                  isAnchorPriceOffer: false,
                  isCheapest: false,
                  isSharedRoom: false,
                  isTopOffer: false,
                  meals: ['breakfast'],
                  providerCode: 'IAN',
                  providerHotelId: '149471',
                  proxyProviderCode: 'IAN',
                  rateBasedOnNumberOfRooms: null,
                  rateBreakdown: {
                    baseRate: 75.24,
                    taxes: 12.79,
                    localTaxes: 0,
                  },
                  roomName: 'Deluxe Room, 1 King Bed, Accessible, Non Smoking',
                  tags: [],
                  cug: null,
                  cancellationPolicy: {
                    freeRefundableUntil: null,
                    description: '',
                  },
                },
              ],
            },
          },
        };

        expect(
          groupedDealsByRoom(state)[
            'Deluxe Room, 1 King Bed, Accessible, Non Smoking'
          ][0].details
        ).toContain('breakfast');
      });

      it('returns pay later if offer canPayLater is true', () => {
        const state = {
          deals: {
            data: {
              offers: [
                {
                  availableRooms: 2,
                  bookURI:
                    'https://r.findhotel.net?pid=ian&sid=0d6b5caeb932928d2d4ece6cd9bfc44561d1c02d&oid=e9c3f14241544d25cb53aa14cf2dc2efaa42268e5c41302b5ca4c17c14680b1c:00&lbl=&ofd=book_uri%3Dcampaign_reference%253D%2526destination%253Dhttps%25253A%25252F%25252Fie.hotels.com%25252Fsearch.do%25253Fmpd%25253DEUR%252526cur%25253DEUR%252526q-check-out%25253D2020-11-22%252526mpe%25253D1603299050%252526mph%25253D0%252526q-check-in%25253D2020-11-21%252526locale%25253Den_IE%252526f-hotel-id%25253D149471%252526destination-id%25253D12508675%252526pos%25253DHCOM_IE%252526q-rooms%25253D1%252526q-room-0-adults%25253D2%252526rateplanid%25253D226102851%252526mpb%25253D12.79%252526mpa%25253D75.24%252526cur%25253DEUR%252526rffrid%25253Dtms.hcom.NL.010.001.01.000.000',
                  canPayLater: true,
                  currency: 'EUR',
                  hasFreeCancellation: true,
                  id:
                    'e9c3f14241544d25cb53aa14cf2dc2efaa42268e5c41302b5ca4c17c14680b1c:00',
                  integrationType: 'redirect',
                  isAnchorPriceOffer: false,
                  isCheapest: false,
                  isSharedRoom: false,
                  isTopOffer: false,
                  meals: ['breakfast'],
                  providerCode: 'IAN',
                  providerHotelId: '149471',
                  proxyProviderCode: 'IAN',
                  rateBasedOnNumberOfRooms: null,
                  rateBreakdown: {
                    baseRate: 75.24,
                    taxes: 12.79,
                    localTaxes: 0,
                  },
                  roomName: 'Deluxe Room, 1 King Bed, Accessible, Non Smoking',
                  tags: [],
                  cug: null,
                  cancellationPolicy: {
                    freeRefundableUntil: null,
                    description: '',
                  },
                },
              ],
            },
          },
        };

        expect(
          groupedDealsByRoom(state)[
            'Deluxe Room, 1 King Bed, Accessible, Non Smoking'
          ][0].details
        ).toContain('room.payLater');
      });
    });

    describe('deal type', () => {
      it('returns room.negotiationDeal.negotiation when offer cug collection has negotiation item', () => {
        const state = {
          deals: {
            data: {
              offers: [
                {
                  availableRooms: 2,
                  bookURI:
                    'https://r.findhotel.net?pid=ian&sid=0d6b5caeb932928d2d4ece6cd9bfc44561d1c02d&oid=e9c3f14241544d25cb53aa14cf2dc2efaa42268e5c41302b5ca4c17c14680b1c:00&lbl=&ofd=book_uri%3Dcampaign_reference%253D%2526destination%253Dhttps%25253A%25252F%25252Fie.hotels.com%25252Fsearch.do%25253Fmpd%25253DEUR%252526cur%25253DEUR%252526q-check-out%25253D2020-11-22%252526mpe%25253D1603299050%252526mph%25253D0%252526q-check-in%25253D2020-11-21%252526locale%25253Den_IE%252526f-hotel-id%25253D149471%252526destination-id%25253D12508675%252526pos%25253DHCOM_IE%252526q-rooms%25253D1%252526q-room-0-adults%25253D2%252526rateplanid%25253D226102851%252526mpb%25253D12.79%252526mpa%25253D75.24%252526cur%25253DEUR%252526rffrid%25253Dtms.hcom.NL.010.001.01.000.000',
                  canPayLater: true,
                  currency: 'EUR',
                  hasFreeCancellation: true,
                  id:
                    'e9c3f14241544d25cb53aa14cf2dc2efaa42268e5c41302b5ca4c17c14680b1c:00',
                  integrationType: 'redirect',
                  isAnchorPriceOffer: false,
                  isCheapest: false,
                  isSharedRoom: false,
                  isTopOffer: false,
                  meals: ['breakfast'],
                  providerCode: 'IAN',
                  providerHotelId: '149471',
                  proxyProviderCode: 'IAN',
                  rateBasedOnNumberOfRooms: null,
                  rateBreakdown: {
                    baseRate: 75.24,
                    taxes: 12.79,
                    localTaxes: 0,
                  },
                  roomName: 'Deluxe Room, 1 King Bed, Accessible, Non Smoking',
                  tags: [],
                  cug: ['negotiation'],
                  cancellationPolicy: {
                    freeRefundableUntil: '2020-11-18T18:00:00Z',
                    description: '',
                  },
                },
              ],
            },
          },
        };

        expect(
          groupedDealsByRoom(state)[
            'Deluxe Room, 1 King Bed, Accessible, Non Smoking'
          ][0].dealType
        ).toBe('room.negotiationDeal.negotiation');
      });

      it('returns room.negotiationDeal.private when offer cug collection has private item', () => {
        const state = {
          deals: {
            data: {
              offers: [
                {
                  availableRooms: 2,
                  bookURI:
                    'https://r.findhotel.net?pid=ian&sid=0d6b5caeb932928d2d4ece6cd9bfc44561d1c02d&oid=e9c3f14241544d25cb53aa14cf2dc2efaa42268e5c41302b5ca4c17c14680b1c:00&lbl=&ofd=book_uri%3Dcampaign_reference%253D%2526destination%253Dhttps%25253A%25252F%25252Fie.hotels.com%25252Fsearch.do%25253Fmpd%25253DEUR%252526cur%25253DEUR%252526q-check-out%25253D2020-11-22%252526mpe%25253D1603299050%252526mph%25253D0%252526q-check-in%25253D2020-11-21%252526locale%25253Den_IE%252526f-hotel-id%25253D149471%252526destination-id%25253D12508675%252526pos%25253DHCOM_IE%252526q-rooms%25253D1%252526q-room-0-adults%25253D2%252526rateplanid%25253D226102851%252526mpb%25253D12.79%252526mpa%25253D75.24%252526cur%25253DEUR%252526rffrid%25253Dtms.hcom.NL.010.001.01.000.000',
                  canPayLater: true,
                  currency: 'EUR',
                  hasFreeCancellation: true,
                  id:
                    'e9c3f14241544d25cb53aa14cf2dc2efaa42268e5c41302b5ca4c17c14680b1c:00',
                  integrationType: 'redirect',
                  isAnchorPriceOffer: false,
                  isCheapest: false,
                  isSharedRoom: false,
                  isTopOffer: false,
                  meals: ['breakfast'],
                  providerCode: 'IAN',
                  providerHotelId: '149471',
                  proxyProviderCode: 'IAN',
                  rateBasedOnNumberOfRooms: null,
                  rateBreakdown: {
                    baseRate: 75.24,
                    taxes: 12.79,
                    localTaxes: 0,
                  },
                  roomName: 'Deluxe Room, 1 King Bed, Accessible, Non Smoking',
                  tags: [],
                  cug: ['private'],
                  cancellationPolicy: {
                    freeRefundableUntil: '2020-11-18T18:00:00Z',
                    description: '',
                  },
                },
              ],
            },
          },
        };

        expect(
          groupedDealsByRoom(state)[
            'Deluxe Room, 1 King Bed, Accessible, Non Smoking'
          ][0].dealType
        ).toBe('room.negotiationDeal.private');
      });
    });
  });
});
