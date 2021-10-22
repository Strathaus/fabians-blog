import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBlogEntry } from 'src/app/models/blog/blog-entry.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private readonly _apiUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient) {}

  public createNewBlogEntries(blogEntry: IBlogEntry): Observable<IBlogEntry> {
    return this._http.post<IBlogEntry>(`${this._apiUrl}/blog`, blogEntry);
  }

  public getBlogEntries(start?: number): Observable<IBlogEntry[]> {
    return this._http.get<IBlogEntry[]>(`${this._apiUrl}/blog`, {
      headers: { start: `${start}` },
    });
  }
}
