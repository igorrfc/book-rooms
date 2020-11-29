export enum Currency {
  EUR = 'EUR',
}

export enum Cug {
  Private = 'private',
  Negotiation = 'negotiation',
}

export enum Meal {
  Breakfast = 'breakfast',
}

export enum Tags {
  Wifi = 'wifi',
}

export interface IOffer {
  id: string;
  roomName: string;
  tags: Tags[] | null;
  cug: Cug[] | null;
  meals: Meal[] | null;
  currency: Currency;
  rateBreakdown: {
    baseRate: number;
    taxes: number;
    localTaxes: number;
  };
  canPayLater: boolean;
  cancellationPolicy: {
    freeRefundableUntil: string | null;
  };
}
