import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from'rxjs/operators'
import { API_URL } from '../app.constants';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticateUser'

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(
    private http : HttpClient
  ) { }

  executeJWTAuthenticationService(username, password){
    return this.http.post<any>(
      `${API_URL}/authenticate`,{
      username,
      password
      }).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        }
      )
    );
    //console.log("Execute Hello World Data Service")
  }

  executeBasicAuthenticationService(username, password){
    let basicAuthHeaderString = 'Basic '+window.btoa(username+':'+password)
    let header = new HttpHeaders({
        Authorization: basicAuthHeaderString
      }
    )
    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`,{headers : header}).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, username);
          return data;
        }
      )
    );
    //console.log("Execute Hello World Data Service")
  }

  getAuthicatedUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedToken(){
    if(this.getAuthicatedUser)
      return sessionStorage.getItem(TOKEN)
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }
}

export class AuthenticationBean{
  constructor(public message:string) {}
}
