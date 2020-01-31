import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //throw new Error("Method not implemented.");
    return next.handle(request).pipe(catchError(err =>{
      if(err.status === 401){
        // logout automático se a resposta 401 retornou da API
        this.authenticationService.logout();
        location.reload(true);  
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
