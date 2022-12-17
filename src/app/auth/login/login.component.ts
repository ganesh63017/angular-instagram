import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/auth-service/httpservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordType = true;
  isSubmitted = false;

  constructor(
    private form: FormBuilder,
    private route: Router,
    private http: HttpService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('userData')) {
      this.route.navigate(['login']);
      this.loginForm = this.form.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    } else {
      this.route.navigate(['home/feeds']);
    }
  }

  showPassword() {
    this.passwordType = !this.passwordType;
  }

  login() {
    this.isSubmitted = !this.isSubmitted;

    if (this.loginForm.valid) {
      this.http.login('/auth/login', this.loginForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.toast.success('Successfully Logged In');
          localStorage.setItem('userData', JSON.stringify(data));
          this.route.navigate(['home/feeds']);
        },
        error: (error) => {
          this.toast.error(error.error.message);
          console.log(JSON.parse(JSON.stringify(error.error)));
        },
      });
    }
  }

  goToRegister() {
    this.route.navigate(['register']);
  }
}
