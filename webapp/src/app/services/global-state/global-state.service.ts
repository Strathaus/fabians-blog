import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { IUser } from 'src/app/models/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  public user = new ReplaySubject<IUser>();

  constructor() {}
}
