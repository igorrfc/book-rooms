import { IOffer } from './deal';
import { Observable, Subject } from 'rxjs';

export enum Status {
  Error = 'error',
  Success = 'Success',
  Standby = 'Standby',
}

export interface IState {
  deals: {
    status: Status;
    data:
      | {
          offers: IOffer[];
        }
      | undefined;
  };
}

export interface IStoreContext {
  state: IState;

  sources: {
    deals: { stream: Observable<any>; connector: Subject<any> };
  };
}
