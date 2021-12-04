import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class HelloWorldBean{
  constructor(public message:string){}
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http:HttpClient
  ) { }

  executeHelloWorldService(){
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean');
    //console.log("Execute Hello World Data Service")
  }

  executeHelloWorldServiceWithPathVariable(name){
    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader()
    // let header = new HttpHeaders({
    //     Authorization: basicAuthHeaderString
    //   }
    // )
    // return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${name}`,{headers : header});
    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${name}`);
    //console.log("Execute Hello World Data Service")
  }

  // createBasicAuthenticationHttpHeader(){
  //   let username = 'kparmar'
  //   let password = '123'
  //   let basicAuthHeaderString = 'Basic '+window.btoa(username+':'+password)
  //   return basicAuthHeaderString;
  // }

  //Access to XMLHttpRequest at 'http://localhost:8080/hello-world/path-variable/kparmar' from origin 'http://localhost:50816' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource
}
