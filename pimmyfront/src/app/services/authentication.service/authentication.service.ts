import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, switchMap } from "rxjs";
//import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, of } from 'rxjs';
//import { User } from '../../model/user.interface';

export interface LoginForm {
  email: string;
  password: string;
};



export const JWT_NAME = 'blog-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(loginForm: LoginForm) {  

    return this.http.post<any>('/back-end/users/login', {email: loginForm.email, password: loginForm.password}).pipe(
      map((token) => {
        console.log('token' + token.access_token);
        console.log('role' + token.role);
      
        localStorage.setItem(JWT_NAME, token.access_token);
        return token;
      })
    )
  }

  logout() {
    localStorage.removeItem(JWT_NAME);
  }

  /*
  register(user: User) {
    return this.http.post<any>('/api/users', user);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }
*/
  /*
  getUserId(): Observable<number>{
    return of(localStorage.getItem(JWT_NAME)).pipe(
      switchMap((jwt: string) => of(this.jwtHelper.decodeToken(jwt)).pipe(
        map((jwt: any) => jwt.user.id)
      )
    ));
  }*/

}