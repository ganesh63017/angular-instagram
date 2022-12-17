import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/auth-service/httpservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup;
  submit = false;

  constructor(
    private route: Router,
    private form: FormBuilder,
    private http: HttpService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('userData')) {
      this.route.navigate(['register']);
      this.registerForm = this.form.group({
        firstName: [
          '',
          [Validators.required, Validators.pattern('[a-zA-Z" "]+$')],
        ],
        lastName: [
          '',
          [Validators.required, Validators.pattern('[a-zA-Z" "]+$')],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      });
    } else {
      this.route.navigate(['home/feeds']);
    }
  }

  gotoLogin() {
    this.route.navigate(['login']);
  }

  register() {
    console.log(this.registerForm.value);
    this.submit = !this.submit;
    if (this.registerForm.valid) {
      this.http.register('/auth/register', this.registerForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.toaster.success('successfully Registered');
          this.route.navigate(['login']);
        },
        error: (error) => {
          console.log(error.error.message);
          this.toaster.error(error.error.message);
        },
      });
    }
  }
}
