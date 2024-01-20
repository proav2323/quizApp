import { AuthService } from './../../services/auth.service';
import { Component, WritableSignal, signal, effect } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterComponent } from '../register/register.component';

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
  constructor(
    private AuthService: AuthService,
    private snackbar: MatSnackBar,
    private dailog: MatDialog,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {
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
        this.serror,
        this.dialogRef
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
    this.dialogRef.close();
    this.dailog.open(RegisterComponent);
  }
}
