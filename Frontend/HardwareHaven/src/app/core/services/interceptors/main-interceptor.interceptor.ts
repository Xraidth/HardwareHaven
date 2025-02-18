import { getHeaders } from '../../../shared/functions/functions';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SampleInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const BASE_URL = 'http://localhost:3000';

        const isPublicRoute =
        [`${BASE_URL}health`,
            `${BASE_URL}/api/user/register`,
          `${BASE_URL}/api/user/login`
        ].includes(request.url);

        const headers = getHeaders(!isPublicRoute);
          const headersObject: { [key: string]: string } = {};
          headers.headers.keys().forEach((key: string) => {
            headersObject[key] = headers.headers.get(key) || '';
          });
          const clonedReq = request.clone({ setHeaders: headersObject });
        return next.handle(clonedReq);
    }
}

