import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'just_smile_ng';

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    if (route === 'dashboard') {
      const password = prompt('Enter password to access Dashboard');
      if (password === '7amaSaida') {
        this.router.navigate([`/${route}`]); // Navigate to dashboard if password is correct
      } else {
        alert('Access denied! Incorrect password.');
      }
    } else {
      this.router.navigate([`/${route}`]); // Navigate normally for other routes
    }
  }
}
