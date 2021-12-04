import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthServiceService implements HttpInterceptor {

  constructor(
    private basicAuthenticationService:BasicAuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler){
    // let username = 'kparmar'
    // let password = '123'
    // let basicAuthHeaderString = 'Basic '+window.btoa(username+':'+password)
      let basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken()
      let username = this.basicAuthenticationService.getAuthicatedUser()

      if(basicAuthHeaderString && username){
        request = request.clone(
          {
            setHeaders:{
              Authorization : basicAuthHeaderString
            }
          }
        )
      }

    request = request.clone({
      setHeaders: {
        Authorization: basicAuthHeaderString
      }
    })
    return next.handle(request);
  }
}
