import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, from, Observable, switchMap } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const ROLE_KEY = 'auth-role';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  authenticationState: Observable<boolean>;
  token: string = '';
  name: string = '';
  role: string = '';  // Tambahkan variable untuk menyimpan role

  constructor(private http: HttpClient, private alert: AlertController) {
    this.authenticationState = from(this.loadData()).pipe(
      switchMap(() => this.isAuthenticated)
    );
  }

  // Simpan token, username, dan role
  saveData(token: string, user: string, role: string) {
    Preferences.set({ key: TOKEN_KEY, value: token });
    Preferences.set({ key: USER_KEY, value: user });
    Preferences.set({ key: ROLE_KEY, value: role });  // Simpan role
    this.token = token;
    this.name = user;
    this.role = role;
    this.isAuthenticated.next(true);
  }

  // Fungsi memuat data token, username, dan role dari storage
  async loadData() {
    const token = await Preferences.get({ key: TOKEN_KEY });
    const user = await Preferences.get({ key: USER_KEY });
    const role = await Preferences.get({ key: ROLE_KEY });

    if (token?.value && user?.value && role?.value) {
      this.token = token.value;
      this.name = user.value;
      this.role = role.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  // Hapus semua data dari storage saat logout
  clearData() {
    this.token = '';
    this.name = '';
    this.role = '';
    Preferences.remove({ key: TOKEN_KEY });
    Preferences.remove({ key: USER_KEY });
    Preferences.remove({ key: ROLE_KEY });
  }

  // Fungsi untuk login ke API
  postMethod(data: any, link: string): Observable<any> {
    return this.http.post(this.apiURL() + '/' + link, data);
  }

  // Fungsi notifikasi untuk menampilkan pesan kesalahan atau informasi
  notifikasi(pesan: string) {
    return this.alert.create({
      header: 'Notifikasi',
      message: pesan,
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }

  // Fungsi untuk mendapatkan URL API utama
  apiURL() {
    return 'http://localhost/bimbingan_api';
  }

  // Fungsi untuk logout dan menghapus data
  logout() {
    this.isAuthenticated.next(false);
    this.clearData();
  }

  // Fungsi untuk mendapatkan role pengguna
  getUserRole(): string {
    return this.role;
  }

  // Fungsi untuk mendapatkan username pengguna
  getUsername(): string {
    return this.name;
  }

  // Fungsi untuk mendapatkan status autentikasi
  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }
  // Fungsi untuk mengambil daftar dosen (lecturer)
  getLecturers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL()}/getdosen.php`);
  }

}
