import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UserCredential } from '@angular/fire/auth';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    //spies for AuthService methods
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
      imports: [Navbar],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loginWithGoogle and navigate on success', async () => {
    // Arrange → return correct type
    const mockCredential = { user: { uid: '123' } } as unknown as UserCredential;
    authServiceSpy.loginWithGoogle.and.returnValue(Promise.resolve(mockCredential));
// Act
    await component.onLogin();
// Assert
    expect(authServiceSpy.loginWithGoogle).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call logout and navigate on success', async () => {
    authServiceSpy.logout.and.returnValue(Promise.resolve());
 // Act
    await component.onLogout();
    // Assert
    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
