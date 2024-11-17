import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homemhs',
  templateUrl: './homemhs.page.html',
  styleUrls: ['./homemhs.page.scss'],
})
export class HomemhsPage implements OnInit {
  lecturers: any;
  name = '';
  role = '';

  constructor(private authService: AuthenticationService, private router: Router) {
    this.name = this.authService.getUsername(); // Mendapatkan username
    this.role = this.authService.getUserRole(); // Mendapatkan role pengguna
  }

  ngOnInit() {
    this.loadLecturers();
  }

  loadLecturers() {
    this.authService.getLecturers().subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.lecturers = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
