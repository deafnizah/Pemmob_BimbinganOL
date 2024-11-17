import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';  // Jika perlu, hubungkan dengan AuthenticationService

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthenticationService) {}

  // Fungsi untuk melakukan registrasi pengguna
  register(username: string, email: string, password: string, role: string) {
    const data = { username, email, password, role };
    return this.http.post('http://localhost/bimbingan_api/register.php', data);
  }
}
