import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  login(url: string, _userData: any) {
    const { email, password } = _userData;
    return this.http.post<any>(environment.Base_url + url, {
      email,
      password,
    });
  }

  register(url: string, registerDetails: any) {
    console.log(environment.Base_url + url);
    return this.http.post<any>(environment.Base_url + url, registerDetails);
  }
}
