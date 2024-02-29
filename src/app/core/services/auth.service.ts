import { Injectable } from '@angular/core';
import { Admin, User } from '../interfaces/iCredentials';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public credentials!: User;

  constructor() { }

  auth(credentials: User ): Boolean {
    if (this.isAdmin(credentials)) {
      //! TODO: if i'm the admin

    } else {
      this.credentials = credentials;
      localStorage.setItem('credentials', JSON.stringify(credentials))
    }
    return true;
  }

  isAdmin(value: any): value is Admin {
    return !!value?.username;
  };
}
