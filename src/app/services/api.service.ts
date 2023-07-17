import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, first, Observable, ReplaySubject, tap, of, shareReplay } from 'rxjs';
import { Subject } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    // reversed proxy new url
    private apiUrl = 'http://localhost:8080/services/login-service/v1/login';
    // Create a new Subject that will emit the session id
    public sessionId$ = new Subject<string>();
    public error$ = new Subject<string>();

    constructor(private httpClient: HttpClient) {}

    login(username: string, password: string): Observable<any> {
      const body = { username,password};
  
      return this.httpClient.post<any>(this.apiUrl, body, {
          headers: {'Content-Type': 'application/json'}
        })
        .pipe(
            tap((response: any) => {
                // Emit the session id whenever a successful login occurs
                this.sessionId$.next(response.sessionId);
                // Store the session id in local storage
                localStorage.setItem('sessionId', response.sessionId);
                // Log the entire local storage
                console.log('sessionId will be stored in LocalStorage using `sessionId’ as key:', localStorage);
              }),
              catchError((error: any) => {
                this.error$.next(error);
                return throwError(error);
              })
        );
    }

}  