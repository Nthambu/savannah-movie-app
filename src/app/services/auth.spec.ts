import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup as signInWithPopupFn,
  signOut as signOutFn,
} from '@angular/fire/auth';

describe('AuthService', () => {
  let service: AuthService;
  let authStub: jasmine.SpyObj<Auth>;

  beforeEach(async () => {
    // ✅ Create a spy object for Auth
    authStub = jasmine.createSpyObj<Auth>('Auth', [], {});

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

  it('should call signInWithPopup when loginWithGoogle is called', async () => {
    const mockUser = { uid: '123' };

    // ✅ Spy on the imported function directly
    spyOn<any>( { signInWithPopupFn }, 'signInWithPopupFn' )
      .and.returnValue(Promise.resolve({ user: mockUser }));

    const result = await service.loginWithGoogle();

    expect(signInWithPopupFn).toHaveBeenCalledWith(authStub, jasmine.any(GoogleAuthProvider));
    expect(result.user.uid).toBe('123');
  });

  it('should call signOut when logout is called', async () => {
    spyOn<any>( { signOutFn }, 'signOutFn' )
      .and.returnValue(Promise.resolve());

    await service.logout();

    expect(signOutFn).toHaveBeenCalledWith(authStub);
  });
});
