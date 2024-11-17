import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit() {}

  register() {
    // Memastikan semua field tidak kosong
    if (this.username && this.email && this.password && this.role) {
      const data = {
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.role,
      };

      // Memanggil API registrasi
      this.authService.postMethod(data, 'register.php').subscribe({
        next: (res) => {
          if (res) {
            // Jika registrasi berhasil, redirect ke halaman login
            this.router.navigateByUrl('/login');
            this.authService.notifikasi('Registrasi Berhasil, Silakan Login');
          } else {
            // Jika registrasi gagal
            this.authService.notifikasi('Registrasi Gagal, Coba Lagi');
          }
        },
        error: (e) => {
          // Menampilkan pesan jika terjadi error
          this.authService.notifikasi('Registrasi Gagal, Periksa Koneksi Internet Anda');
        },
      });
    } else {
      // Notifikasi jika ada field yang kosong
      this.authService.notifikasi('Semua Field Harus Diisi');
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
