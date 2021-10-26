import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ITag } from '../../../models/blog/tag.interface';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private readonly _apiUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient) {}

  public getTags(q?: string): Observable<ITag[]> {
    return this._http.get<ITag[]>(
      `${this._apiUrl}/tags`,
      q
        ? {
            params: { q },
          }
        : undefined
    );
  }
}
