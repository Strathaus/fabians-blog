import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IBlogEntry } from './models/blog-entry.interface';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private readonly _apiUrl = environment.apiUrl;

  constructor(private readonly _http: HttpClient) {}

  public createNewBlogEntry(blogEntry: IBlogEntry): Observable<IBlogEntry> {
    return this._http.post<IBlogEntry>(`${this._apiUrl}/blogs`, blogEntry);
  }

  public getBlogEntries(
    start?: number,
    tags?: string[]
  ): Observable<IBlogEntry[]> {
    return this._http.get<IBlogEntry[]>(`${this._apiUrl}/blogs`, {
      params: { start: `${start}`, ...(tags ? { tags } : {}) },
    });
  }

  public getBlogEntry(id: string): Observable<IBlogEntry> {
    return this._http.get<IBlogEntry>(`${this._apiUrl}/blogs/${id}`);
  }

  public editBlogEntry(id: string, data: IBlogEntry): Observable<IBlogEntry> {
    return this._http.put<IBlogEntry>(`${this._apiUrl}/blogs/${id}`, data);
  }

  public removeBlogEntry(id: string): Observable<void> {
    return this._http.delete<void>(`${this._apiUrl}/blogs/${id}`);
  }
}
