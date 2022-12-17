import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HomeHttpService {
  constructor(private http: HttpClient) {}
  getHeader(token: any) {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getFeeds(url: string, token: string) {
    let headers = this.getHeader(token);
    return this.http.get<any>(environment.Base_url + url, { headers });
  }
  getComments(url: string, token: string) {
    let headers = this.getHeader(token);
    return this.http.get<any>(environment.Base_url + url, { headers });
  }

  likeForPost(id: string, token: string) {
    let headers = this.getHeader(token);
    return this.http.patch<any>(
      environment.Base_url + `/feeds/likes/${id}`,
      '',
      {
        headers,
      }
    );
  }

  getComment(id: string, token: string) {
    let headers = this.getHeader(token);
    return this.http.get<any>(environment.Base_url + `/feeds/comments/${id}`, {
      headers,
    });
  }

  getSavedPost(token: string) {
    let headers = this.getHeader(token);
    return this.http.get<any>(environment.Base_url + '/feeds/save', {
      headers,
    });
  }

  deleteSavePost(id: string, token: string) {
    let headers = this.getHeader(token);
    return this.http.delete<any>(environment.Base_url + `/feeds/save/${id}`, {
      headers,
    });
  }

  savePost(id: string, token: string) {
    let headers = this.getHeader(token);
    return this.http.post<any>(environment.Base_url + `/feeds/save/${id}`, '', {
      headers,
    });
  }

  likeToComment(id: string, token: string) {
    let headers = this.getHeader(token);
    return this.http.post<any>(
      environment.Base_url + `/feeds/comments/likes/${id}`,
      '',
      {
        headers,
      }
    );
  }

  commentToFeed(token: string, id: string, payload: any): Observable<any> {
    let headers = this.getHeader(token);
    return this.http.post<any>(
      environment.Base_url + `/feeds/comments/${id}`,
      payload,
      {
        headers,
      }
    );
  }

  replyToComment(
    token: string,
    feedId: string,
    commentID: string,
    payload: any
  ): Observable<any> {
    let headers = this.getHeader(token);
    return this.http.post<any>(
      environment.Base_url + `/feeds/comments/${feedId}/${commentID}`,
      payload,
      {
        headers,
      }
    );
  }
}
