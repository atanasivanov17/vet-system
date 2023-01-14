import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../dto/user.dto';
import { AuthenticationService } from '../services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { EncryptionService } from '../services/encryption.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  user!: User;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
    private encryptionService: EncryptionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submitForm() {
    this.user = this.loginForm.value;
    this.authenticationService.authenticate(this.user).subscribe({
      next: (res: any) => {
        if (res.jwtToken) this.cookieService.set('jwt-token', res.jwtToken);
        if (res.role) {
          const encryptedRole = this.encryptionService.encrypt(res.role);
          this.cookieService.set('role', encryptedRole);
        }
      },
      error: (err) => {
        this.loginForm.setErrors({
          incorrect: true,
        });
      },
      complete: () => {
        this.router.navigate(['appointment-list']).then( () =>
          window.location.reload()
        );
      },
    });
  }
}
