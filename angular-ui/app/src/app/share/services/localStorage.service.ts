import { Injectable } from '@angular/core';
import { IUserPersonalInfo } from '../interfaces/userPersonalData.interface';

enum DATA {
  USER_ID = 'userID',
  USER_NAME = 'userName',
  USER_PREFIX = 'prefix',
  USER_birthDate = 'birthDate',
  USER_TEL = 'telecom'
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public clean(): void {
    localStorage.clear();
  }

  public saveUserData(userResponse: any) {
    localStorage.clear();
    this.saveUserID(userResponse.id);
    this.saveUserName(userResponse.name[0]);
    this.saveBOD(userResponse.birthDate);
    this.saveTelecom(userResponse.telecom[0].value);
  }

  private saveUserID(user: any): void {
    localStorage.setItem(DATA.USER_ID, JSON.stringify(user));
  }

  private saveUserName(user: any): void {
    localStorage.setItem(DATA.USER_NAME, JSON.stringify(user.given[0]));
    localStorage.setItem(DATA.USER_PREFIX, JSON.stringify(user.prefix[0]));
  }

  private saveBOD(user: string) {
    localStorage.setItem(DATA.USER_birthDate, JSON.stringify(user));
  }

  public saveTelecom(telecom: string) {
    localStorage.setItem(DATA.USER_TEL, JSON.stringify(telecom));
  }

  public getUserID(): string {
    const user = localStorage.getItem(DATA.USER_ID);

    if (user) {
      return JSON.parse(user);
    }

    return '';
  }

  public getUserData(): IUserPersonalInfo {
    const name = localStorage.getItem(DATA.USER_NAME);
    const prefix = localStorage.getItem(DATA.USER_PREFIX);
    const birth = localStorage.getItem(DATA.USER_birthDate);
    const phone = localStorage.getItem(DATA.USER_TEL);
    if (name && prefix && birth && phone) {
      const userPrefix = JSON.parse(prefix);
      const userName = JSON.parse(name);
      const birthDate = JSON.parse(birth);
      const telecom = JSON.parse(phone);
      return {
        prefix: userPrefix,
        name: userName,
        birthDate: birthDate,
        telecom: telecom
      };
    } else return { prefix: '', name: '', birthDate: '', telecom: '' };
  }
}
