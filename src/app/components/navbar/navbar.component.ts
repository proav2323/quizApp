import { AuthService } from './../../services/auth.service';
import { Component, effect } from '@angular/core';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user: user | null = null;
  constructor(private AuthService: AuthService) {
    effect(() => {
      this.user = this.AuthService.user();
    });
  }
}
