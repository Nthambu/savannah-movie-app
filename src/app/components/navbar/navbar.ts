import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  public readonly user$;
  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.user$;
  }

  onLogin() {
    this.authService
      .loginWithGoogle()
      .then(() => {
        // Optional: Redirect user after successful login
        this.router.navigate(['/']);
      })
      .catch((error) => console.error('Login failed:', error));
  }

  onLogout() {
    this.authService
      .logout()
      .then(() => {
        //  Redirect user to home after logout
        this.router.navigate(['/']);
      })
      .catch((error) => console.error('Logout failed:', error));
  }
}
