import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly user$: Observable<User | null>;
  constructor(private auth: Auth) {
    this.user$ = user(this.auth);
  }
  // Login with Google
  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
  // Logout
  logout() {
    // Also, let's complete the logout function
    return signOut(this.auth);
  }
}
