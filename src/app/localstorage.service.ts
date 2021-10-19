import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(
  ) { }

  getJson(key: string): { [key: string]: any } {
    if (!localStorage) {
      return {};
    }
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return {};
    }
  }

  setJson(key: string, value: any): void {
    if (value) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  getText(key: string): string {
    if (localStorage) {
      return localStorage.getItem(key);
    } else {
      return '';
    }
  }

  setText(key: string, value: any): void {
    localStorage.setItem(key, value);
  }
}
