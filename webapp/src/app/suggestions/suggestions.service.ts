import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SuggestionsService {
  private readonly _apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  public getSuggestions(): Observable<any[]> {
    return this.http.get<any[]>(`${this._apiUrl}/suggestions`);
  }
}
