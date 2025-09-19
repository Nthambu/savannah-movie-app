import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  UserCredential,
} from '@angular/fire/auth';
import * as AngularFireAuth from '@angular/fire/auth';
describe('AuthService', () => {
  let service: AuthService;
  
let authStub: Auth;
  

beforeEach(async () => {
  authStub = {} as unknown as Auth; // ✅ bypass strict type requirements

  await TestBed.configureTestingModule({
    providers: [
      AuthService,
      { provide: Auth, useValue: authStub },
    ],
  }).compileComponents();

  service = TestBed.inject(AuthService);
});


  it('should create', () => {
    expect(service).toBeTruthy();
  });


});
