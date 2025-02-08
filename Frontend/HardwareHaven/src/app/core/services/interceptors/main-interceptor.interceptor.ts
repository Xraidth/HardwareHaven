import { HttpInterceptorFn } from '@angular/common/http';
import { getHeaders } from '../../../shared/functions/functions';


export const mainInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

const BASE_URL = 'http://localhost:3000';


  let op: boolean = false;

  switch (req.url) {
    case `${BASE_URL}/api/user/register`:
      op = true;
      break;

    case `${BASE_URL}/api/user/login`:
      op = true;
      break;

    default:
      op = false;
      break;
  }

  let headers = getHeaders(op);


  const headersObject: { [key: string]: string } = {};
  headers.headers.keys().forEach((key: string) => {
    headersObject[key] = headers.headers.get(key) || '';
  });



  const clonedReq = req.clone({ setHeaders: headersObject });
  return next(clonedReq);

};
