import { Auth } from 'firebase/auth';
import { AuthService } from './../../services/auth.service';
import { Component, WritableSignal, effect, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  loading: boolean = false;
  error: string = '';
  errors: WritableSignal<string> = signal('');
  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });
  constructor(private AuthService: AuthService) {
    effect(() => {
      this.loading = this.AuthService.loading();
      this.error = this.errors();
    });
  }
  login() {
    this.errors.set('');
    if (this.formGroup.valid) {
      this.AuthService.register(
        this.formGroup.controls['email'].value!,
        this.formGroup.controls['password'].value!,
        this.formGroup.controls['name'].value!,
        this.errors
      );
    } else {
      if (this.formGroup.controls['email'].hasError('required')) {
        this.errors.set('email is required');
      } else if (this.formGroup.controls['password'].hasError('required')) {
        this.errors.set('password is required');
      } else if (this.formGroup.controls['email'].hasError('email')) {
        this.errors.set('invalid email');
      } else if (this.formGroup.controls['name'].hasError('required')) {
        this.errors.set('name is required');
      } else {
        this.errors.set('invalid error');
      }
    }
  }
}
