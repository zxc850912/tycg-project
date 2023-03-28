import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;
  errorMessage!: string;


  constructor(private router: Router,private authService: AuthService) {}

  login(){
    if (this.username === 'admin' && this.password === 'admin') {
      // 登入成功後將 isLoggedIn 設為 true
      this.authService.login();
      // 導向到首頁
      this.router.navigate(['/Home']);
    } else {
      // 登入失敗時顯示錯誤訊息
      this.errorMessage = 'Please check your username or password';
      alert(this.errorMessage);
    }
  }

  ngOnInit(): void {
  }

}
