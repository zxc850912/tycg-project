import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;
  errorMessage!: string;

  data$ = new Observable<any>();

  caseRoleKeyList: any;
  nameList: any;

  constructor(private router: Router,private authService: AuthService,public datasvc: DataService) {}

  ngOnInit(): void {

  }

  login(){
    if (this.username && this.password ) {
      // 登入成功後將 isLoggedIn 設為 true

      var payload = {
        "authName": this.username,
        "authHash": this.password
      }

      this.data$ = this.datasvc.token(payload);
      this.data$.subscribe((x)=>{
        console.log(x);
        this.caseRoleKeyList = x.enableCaseFeatures.map((item: { caseRoleKey: any; }) => item.caseRoleKey);
        console.log(this.caseRoleKeyList);
        this.datasvc.setCaseList(this.caseRoleKeyList);     // 儲存所有caseRoleKey

        this.nameList = x.enableCaseFeatures.map((item: { name: any; }) => item.name);
        console.log(this.nameList);
        this.datasvc.setNameList(this.nameList);            // 儲存所有name
      })

      this.authService.login();
      // 導向到首頁
      this.router.navigate(['/Home']);
    } else {
      // 登入失敗時顯示錯誤訊息
      this.errorMessage = 'Please check your username or password';
      alert(this.errorMessage);
      this.username = '';
      this.password = '';
    }
  }

}
