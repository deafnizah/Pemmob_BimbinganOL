import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit() {}

  login() {
    // Memastikan username dan password tidak kosong
    if (this.username && this.password) {
      const data = {
        username: this.username,
        password: this.password,
      };

      // Memanggil API login
      this.authService.postMethod(data, 'login.php').subscribe({
        next: (res) => {
          if (res.status_login === 'berhasil') {
            // Menyimpan token, username, dan role ke local storage
            this.authService.saveData(res.token, res.username, res.role);

            // Mengosongkan field setelah login
            this.username = '';
            this.password = '';

            // Mengarahkan pengguna berdasarkan role
            if (res.role === 'student') {
              this.router.navigateByUrl('/home');
            } else if (res.role === 'lecturer') {
              this.router.navigateByUrl('/home');
            } else {
              this.authService.notifikasi('Role tidak dikenali');
            }
          } else {
            // Menampilkan notifikasi jika login gagal
            this.authService.notifikasi('Username atau Password Salah');
          }
        },
        error: (e) => {
          // Menampilkan pesan jika terjadi error
          this.authService.notifikasi('Login Gagal Periksa Koneksi Internet Anda');
        },
      });
    } else {
      // Notifikasi jika username atau password kosong
      this.authService.notifikasi('Username atau Password Tidak Boleh Kosong');
    }
  }
}
