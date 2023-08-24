import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: boolean = false;

  constructor(public datasvc: DataService) { }

  login(): void {
    this.loggedIn = true;
  }

  logout(): void {
    this.loggedIn = false;
    this.datasvc.setCaseList([]);
    this.datasvc.setNameList([]);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

}
