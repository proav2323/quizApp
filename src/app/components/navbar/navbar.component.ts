import { AuthService } from './../../services/auth.service';
import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { user } from 'src/app/models/user';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { signOut } from 'firebase/auth';
import { auth } from 'src/firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user: user | null = null;
  search: string = '';
  constructor(
    private AuthService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {
    effect(() => {
      this.user = this.AuthService.user();
    });
  }
  searchDone() {
    this.router.navigate(['/search'], { queryParams: { search: this.search } });
  }
  check(e: any) {
    if (e.keyCode === 13) {
      this.searchDone();
    }
  }

  openModel() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  async signout() {
    await signOut(auth).then(() => {
      this.AuthService.getUser();
    });
  }
}
