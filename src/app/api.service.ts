import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private _users:any = [];
  usersSubject: Subject<any> = new Subject<any>();
  Users = this.usersSubject.asObservable();

  private _notes:any = [];
  notesSubject: Subject<any> = new Subject<any>();
  Notes = this.notesSubject.asObservable();


  selectedUserId = 0;
  baseUrl: string = "http://localhost:8081";
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient
  ) {
    this.getUsers();
  }

  //Get
  getUsers() {
    this.http.get(`${this.baseUrl}/users`).subscribe(data => {
      this._users = data;
      this.usersSubject.next(this._users);
    });
  }

  getNotes(userId) {
    this.selectedUserId = userId;
    this.http.get(`${this.baseUrl}/users/${this.selectedUserId}/notes`).subscribe(data => {
      this._notes = data;
      this.notesSubject.next(this._notes);
    });
  }

  //Post
  addUser = (user) => {
    return this.http.post(
      `${this.baseUrl}/users`, 
      {name: user},
      {headers: this.headers}
    );
  }

  addNote = (content) => {
    return this.http.post(
      `${this.baseUrl}/users/${this.selectedUserId}/notes`,
      {content: content},
      {headers: this.headers}
    );
  }

  //Delete
  deleteUser() {
    return this.http.delete(
      `${this.baseUrl}/users/${this.selectedUserId}`
    );
  }
}
