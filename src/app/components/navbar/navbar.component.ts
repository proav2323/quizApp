import { AuthService } from './../../services/auth.service';
import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user: user | null = null;
  search: string = '';
  constructor(private AuthService: AuthService, private router: Router) {
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
}
