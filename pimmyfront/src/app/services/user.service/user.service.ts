import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from 'src/app/model/user.interface';

export interface UserData {
  items: User[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  findAll() { 

    /*
    return this.http.get<any>('/back-end/users').pipe(
      map((userData: UserData) => userData),
      catchError(err => throwError(err))
    )*/

    return this.http.get<any>('/back-end/users');
  }
}
