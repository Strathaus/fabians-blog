import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { IUser } from 'src/app/models/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  public user = new ReplaySubject<IUser>();
  public loading = new BehaviorSubject<number>(0);

  constructor() {}
}
