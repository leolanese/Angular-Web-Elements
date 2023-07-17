import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogResponseHeadersInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
      console.log(`Request URL: ${req.url}`);
      console.log(`Request Method: ${req.method}`);
      console.log(`Request Headers:`, req.headers.keys());
      console.log(`Request Body:`, req.body);
  
      return next.handle(req).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            console.log(`Response Status: ${event.status}`);
            console.log(`Response Headers:`, event.headers.keys());
            console.log(`Response Body:`, event.body);
          }
        })
      );
    }
}


