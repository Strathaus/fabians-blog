import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/http/authentication/authentication.service';
import { GlobalStateService } from 'src/app/services/global-state/global-state.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(
    public readonly globalStateService: GlobalStateService,
    private readonly _authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this._authenticationService.deleteAuthentication().subscribe();
  }
}
