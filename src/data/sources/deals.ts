import { Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';

const jsonResponse = require('../../sample-hotel-data.json');

interface Response extends AjaxResponse {
  response: { data: string };
}

const dealsAjax$ = ajax({
  url: 'https://httpbin.org/delay/0.5',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: jsonResponse,
});

export const dealsConnector$ = new Subject();

export const dealsStream$ = dealsAjax$.pipe(
  map(({ response }: Response) => JSON.parse(response.data).results[0]),
  catchError((error) => throwError(error.message))
);
