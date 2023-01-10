import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../dto/user.dto';
import { AuthenticationService } from '../services/authentication.service';
import { CookieService } from "ngx-cookie-service";

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
    private cookieService: CookieService
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
        if(res.jwtToken) this.cookieService.set('jwt-token', res.jwtToken);
        console.log(res.role);
      },
      error: (err) => {
        this.loginForm.setErrors({
          incorrect: true,
        });
      },
      complete: () => console.info('complete'),
    });
  }
}
