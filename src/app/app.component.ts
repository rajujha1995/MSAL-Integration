import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="isAuthenticated">
      <h1>Welcome, {{ userDisplayName }}</h1>
      <button (click)="logout()">Logout</button>
    </div>
    <div *ngIf="!isAuthenticated">
      <button (click)="login()">Login</button>
    </div>
  `
})
export class AppComponent {
  isAuthenticated = false;
  userDisplayName = '';

  constructor(private authService: MsalService) {}

  login() {
    this.authService.loginRedirect()
      .subscribe(() => {
        this.isAuthenticated = this.authService.instance.getAllAccounts().length > 0;
        if (this.isAuthenticated) {
          const account = this.authService.instance.getAllAccounts()[0];
          this.userDisplayName = account.name ? account.name : 'Unknown User';
        }
      });
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.userDisplayName = '';
  }
}
