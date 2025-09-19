import { Injectable, inject } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, user, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

/**
 * AuthService provides a centralized way to manage user authentication
 * throughout the application. It encapsulates all interactions with the
 * Firebase Authentication service, offering simple methods for login, logout,
 * and observing the current user's authentication state.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * A public, readonly observable that emits the current Firebase `User` object
   * when a user is authenticated, or `null` when they are not.
   *
   * This stream is the single source of truth for the authentication state.
   * Any part of the application can subscribe to it to reactively update the UI
   * or perform actions based on the user's login status.
   */
  public readonly user$: Observable<User | null>;

  /**
   * The injected instance of the Firebase Authentication service from AngularFire.
   * It is the primary tool for interacting with Firebase Auth.
   * Note: This is an alternative to constructor injection using the `inject` function.
   */
  private readonly auth: Auth = inject(Auth);

  constructor() {
    // Initialize the user$ observable by calling the `user` function from
    // AngularFire, which provides a hot observable of the auth state.
    this.user$ = user(this.auth);
  }

  /**
   * Initiates the Google Sign-In process using a popup window.
   * This abstracts the underlying Firebase implementation from the components.
   * @returns {Promise<UserCredential>} A promise that resolves with the user's
   * credentials upon successful login.
   */
  loginWithGoogle() {
    // Creates a new instance of the GoogleAuthProvider and uses it with
    // Firebase's signInWithPopup method.
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  /**
   * Signs the current user out of the application.
   * @returns {Promise<void>} A promise that resolves when the sign-out
   * process is complete.
   */
  logout() {
    // Calls the signOut method from Firebase to clear the user's session
    // and update the authentication state.
    return signOut(this.auth);
  }
}
