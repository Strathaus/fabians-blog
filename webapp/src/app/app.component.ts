import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/http/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.getAuthenticationStatus().subscribe();
  }
}
