import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { AuthService } from './services/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('App', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // 🔹 Create spies
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', [
      'loginWithGoogle',
      'logout',
    ]);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
//Override readonly user$ using defineProperty
    Object.defineProperty(authServiceSpy, 'user$', {
      value: of(null),
      writable: false,
    });

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
