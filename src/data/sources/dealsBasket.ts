import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';
import { match, __ } from 'ts-pattern';

export enum DealsBasketAction {
  Increment = 'increment',
  Decrement = 'decrement',
  EmptyBasket = 'empty',
}

export type DealsBasketMutations =
  | {
      action: DealsBasketAction.Increment;
      id: string;
    }
  | { action: DealsBasketAction.Decrement; id: string };
export const dealsBasketStream$ = new Subject();

export const dealsBasketConnector$ = dealsBasketStream$.pipe(
  scan((basket, action) => {
    return match(action)
      .with(
        { action: DealsBasketAction.Increment, id: __.string },
        ({ id }) => ({ ...basket, [id]: (basket[id] || 0) + 1 })
      )
      .with(
        { action: DealsBasketAction.Decrement, id: __.string },
        ({ id }) => {
          const newQty = Math.max((basket[id] || 0) - 1, 0);

          if (newQty === 0) {
            delete basket[id];

            return basket;
          } else {
            return { ...basket, [id]: Math.max((basket[id] || 0) - 1, 0) };
          }
        }
      )
      .otherwise(() => basket);
  }, <Record<string, number>>{})
);
