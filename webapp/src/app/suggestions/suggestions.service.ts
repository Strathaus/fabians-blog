import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ISuggestion } from './models/suggestion.interface';

@Injectable({
  providedIn: 'root',
})
export class SuggestionsService {
  private readonly _apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  public getSuggestions(): Observable<ISuggestion[]> {
    return this.http.get<ISuggestion[]>(`${this._apiUrl}/suggestions`);
  }

  public getSuggestion(id: string): Observable<ISuggestion> {
    return this.http.get<ISuggestion>(`${this._apiUrl}/suggestions/${id}`);
  }

  public submitSuggestion(suggestion: ISuggestion): Observable<ISuggestion> {
    return this.http.post<ISuggestion>(
      `${this._apiUrl}/suggestions`,
      suggestion
    );
  }

  public editSuggestion(
    id: string,
    suggestion: ISuggestion
  ): Observable<ISuggestion> {
    return this.http.put<ISuggestion>(
      `${this._apiUrl}/suggestions/${id}`,
      suggestion
    );
  }

  public deleteSuggestion(id: string): Observable<void> {
    return this.http.delete<void>(`${this._apiUrl}/suggestions/${id}`);
  }

  public like(id: string): Observable<number> {
    return this.http.post<number>(
      `${this._apiUrl}/suggestions/${id}/like`,
      null
    );
  }

  public removeLike(id: string): Observable<number> {
    return this.http.delete<number>(`${this._apiUrl}/suggestions/${id}/like`);
  }
}
