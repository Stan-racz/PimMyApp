import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


export interface LoginForm {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }
  login(loginForm: LoginForm) {
    // console.log(loginForm.email, loginForm.password)
    return this.http.post<any>('http://localhost:3000/back-end/users/login', {
      email: loginForm.email,
      password: loginForm.password
    }).pipe(
      map((token) => {
        // console.log('token ' + token.access_token);
        // console.log('role ' + token.role);
        console.log(token.userEmail)
        localStorage.setItem('token retourné', token.access_token);
        localStorage.setItem('role', token.role)
        localStorage.setItem('userEmail', token.userEmail)
        return token;
      })
    )
  }

  logOut() {
    localStorage.clear();
  }
}


