import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  public readonly user$;
  constructor(private authService: AuthService, private router: Router,private snackBar:MatSnackBar) {
    this.user$ = this.authService.user$;
  }

  onLogin() {
    this.authService
      .loginWithGoogle()
      .then(() => {
        //  Redirect user after successful login
    this.snackBar.open('Login successful!', 'Close',{
  duration: 3000
});
    this.router.navigate(['/']);
      })
      .catch((error) => this.snackBar.open('Login failed!', 'Close',{
  duration: 3000
}));
       
  }

  onLogout() {
    this.authService
      .logout()
      .then(() => {
        //  Redirect user to home after logout
        this.router.navigate(['/']);
        this.snackBar.open('Logged out!', 'Close',{
  duration: 3000
})
      })
      .catch((error) => this.snackBar.open('Logout failed!', 'Close',{
  duration: 3000
}));
  }
}
