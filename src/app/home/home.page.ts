import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  name = '';
  role = '';

  constructor(private authService: AuthenticationService, private router: Router) {
    this.name = this.authService.getUsername(); // Mendapatkan username
    this.role = this.authService.getUserRole(); // Mendapatkan role pengguna
  }

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
