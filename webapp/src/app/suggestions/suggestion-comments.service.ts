import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IComment } from './models/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class SuggestionCommentsService {
  private _apiUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient) {}

  public getComments(
    suggestionId: string,
    skip?: number,
    limit?: number
  ): Observable<IComment[]> {
    let params = new HttpParams();
    if (skip) params = params.append('skip', skip);
    if (limit) params = params.append('limit', limit);
    return this._http.get<IComment[]>(
      `${this._apiUrl}/suggestions/${suggestionId}/comments`,
      { params }
    );
  }

  public submitComment(
    suggestionId: string,
    comment: IComment
  ): Observable<IComment> {
    return this._http.post<IComment>(
      `${this._apiUrl}/suggestions/${suggestionId}/comments`,
      comment
    );
  }
}
