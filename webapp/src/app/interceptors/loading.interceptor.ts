import { Observable } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, tap } from 'rxjs/operators';
import { GlobalStateService } from '../services/global-state/global-state.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private readonly _globalStateService: GlobalStateService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._globalStateService.$loading.next(
      this._globalStateService.$loading.value + 1
    );
    return next.handle(request).pipe(
      filter((ev: HttpEvent<any>) => ev instanceof HttpResponse),
      tap((_: HttpEvent<any>) => {
        this._globalStateService.$loading.next(
          this._globalStateService.$loading.value - 1
        );
      }),
      catchError((ev) => {
        this._globalStateService.$loading.next(
          this._globalStateService.$loading.value - 1
        );
        throw ev;
      })
    );
  }
}
