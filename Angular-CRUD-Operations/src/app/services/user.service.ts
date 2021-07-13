import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';


import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  public headers=new HttpHeaders().set("Content-Type","application/json");

  getpatients(): Observable<any>{
    return (this.http.get('/api/employees/',{headers:this.headers}));
  }

  addUser(user: User) {
    return this.http.post('/api/employees/create/',user);
  }
  updateUser(user: any) {
    return this.http.put('/api/employees/update/'+user.Id+'/',user);
  }
  
  deleteUser(user: any) {
    return this.http.delete('/api/employees/delete/'+user.Id+'');
  }

}
