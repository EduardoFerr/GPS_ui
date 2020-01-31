import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private autenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept')
    //throw new Error("Method not implemented.");
    let currentUser = this.autenticationService.currentUserValue;
    console.log(currentUser);
    if(currentUser && currentUser.data.token){
      console.log(currentUser.data.token)
      request = request.clone({
        setHeaders: {
          'x-access-token': `${currentUser.data.token}`,
        }
      });
    }

    return next.handle(request);

  }
}
