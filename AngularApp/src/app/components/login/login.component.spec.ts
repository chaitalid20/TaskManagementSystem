import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { of } from 'rxjs';
import { User } from '../model/user';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        RouterTestingModule,
        FormsModule // Import the FormsModule here
      ],
      providers: [
        { provide: AuthService, useValue: { register: () => {}, login: () => {} } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService);

    fixture.detectChanges();
  });

  it('should call AuthService register method on register', () => {
    const user: User = { username: 'testuser', password: 'password123' };

    spyOn(authService, 'register').and.returnValue(of(null));

    component.register(user);

    expect(authService.register).toHaveBeenCalledWith(user);
  });

  it('should navigate to dashboard on successful login', () => {
    const user: User = { username: 'testuser', password: 'password123' };

    spyOn(authService, 'login').and.returnValue(of('fakeToken'));
    spyOn(component.router, 'navigate');

    component.login(user);

    expect(authService.login).toHaveBeenCalledWith(user);
    expect(localStorage.getItem('authToken')).toBe('fakeToken');
    expect(component.router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
