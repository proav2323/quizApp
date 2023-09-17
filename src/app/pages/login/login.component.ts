import { AuthService } from './../../services/auth.service';
import { Component, WritableSignal, signal, effect } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  serror: WritableSignal<string> = signal('');
  error: string = '';
  loading: boolean = false;
  constructor(private AuthService: AuthService) {
    effect(() => {
      this.error = this.serror();
      this.loading = this.AuthService.loading();
    });
  }

  login() {
    this.serror.set('');
    if (this.formGroup.valid) {
      this.AuthService.login(
        this.formGroup.controls['email'].value!,
        this.formGroup.controls['password'].value!,
        this.serror
      );
    } else {
      if (this.formGroup.controls['email'].hasError('required')) {
        this.serror.set('email is required');
      } else if (this.formGroup.controls['password'].hasError('required')) {
        this.serror.set('password is required');
      } else if (this.formGroup.controls['email'].hasError('email')) {
        this.serror.set('invalid email');
      } else {
        this.serror.set('invalid error');
      }
    }
  }
}
