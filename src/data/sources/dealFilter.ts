import {Subject} from "rxjs";

import DealFilter from "../../types/dealFilter";

export const dealFilterConnector$ = new Subject();

export const dealFilterStream$ = new Subject<DealFilter>();
