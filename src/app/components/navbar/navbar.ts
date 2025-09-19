import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  public readonly user$;
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.user$ = this.authService.user$;
  }
  /**
   * Initiates the Google login process via the AuthService.
   * On success, it navigates the user to the home page and displays a success notification.
   * On failure, it displays an error notification.
   */
  onLogin() {
    this.authService
      .loginWithGoogle()
      .then(() => {
        //  Redirect user after successful login
        this.showMessage('Login successful!');
        this.router.navigate(['/']);
      })
      .catch((error) => this.showMessage('Login failed!'));
  }
  /**
   * Initiates the logout process via the AuthService.
   * On success, it navigates the user to the home page and displays a confirmation message.
   * On failure, it displays an error notification.
   */
  onLogout() {
    this.authService
      .logout()
      .then(() => {
        //  Redirect user to home after logout
        this.router.navigate(['/']);
        this.showMessage('Logged out!');
      })
      .catch((error) => this.showMessage('Logout failed!'));
  }
  /**
   * A private helper method to display error messages in a consistent way.
   * @param {string} message - The error message to display to the user.
   */
  private showMessage(message: string): void {
    this.snackBar.open(message, 'close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
