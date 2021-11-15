import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { GlobalStateService } from '../../global-state/global-state.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly _apiUrl = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly globalStateService: GlobalStateService
  ) {}

  public getAuthenticationStatus() {
    return this.http
      .get<any>(`${this._apiUrl}/authentication`)
      .pipe(tap((user) => this.globalStateService.$user.next(user)));
  }

  public deleteAuthentication(): Observable<void> {
    return this.http
      .delete<void>(`${this._apiUrl}/authentication`)
      .pipe(tap(() => this.globalStateService.$user.next(undefined)));
  }
}
