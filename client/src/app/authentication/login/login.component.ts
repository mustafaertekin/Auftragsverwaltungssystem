import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { AuthService } from '@avs-services/index';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router,
     private route: ActivatedRoute) {}

  public get email() {
    return this.loginForm.get('email');
  }

  public get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('admin@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('99032', [Validators.required]),
    });
  }

  public submit() {
    const password = this.password.value;
    const email = this.email.value;
    if (this.loginForm.valid) {
      this.authService.login(email, password)
      .subscribe(result => {
        this.router.navigate(['/', 'dashboard', 'main'], { relativeTo: this.route });
      },
      err => { 
        console.log('Login failed', err);
        this.router.navigate(['/auth', 'login'], { relativeTo: this.route });
      });
    }
  }
}
