import { Auth } from 'firebase/auth';
import { AuthService } from './../../services/auth.service';
import { Component, WritableSignal, effect, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

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
  constructor(
    private AuthService: AuthService,
    private snackbar: MatSnackBar,
    private MatDialogRef: MatDialogRef<RegisterComponent>,
    private dailog: MatDialog
  ) {
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
        this.errors,
        this.MatDialogRef
      );
    } else {
      if (this.formGroup.controls['email'].hasError('required')) {
        this.snackbar.open('ivalid credentials', 'close');
      } else if (this.formGroup.controls['password'].hasError('required')) {
        this.snackbar.open('ivalid credentials', 'close');
      } else if (this.formGroup.controls['email'].hasError('email')) {
        this.snackbar.open('ivalid credentials', 'close');
      } else {
        this.snackbar.open('somehting went wrong', 'close');
      }
    }
  }

  openModel() {
    this.MatDialogRef.close();
    this.dailog.open(LoginComponent);
  }
}
