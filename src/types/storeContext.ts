import { IOffer } from './deal';
import { Observable, Subject } from 'rxjs';
import DealFilter from './dealFilter';

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

  dealFilter: {
    status: Status;
    data: DealFilter | undefined;
  };
}

export interface IStoreContext {
  state: IState;

  sources: {
    deals: { stream: Observable<any>; connector: Subject<any> };
    dealFilter: { stream: Subject<DealFilter>; connector: Subject<any> };
  };
}
