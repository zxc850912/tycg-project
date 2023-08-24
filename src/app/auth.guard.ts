import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // 檢查使用者是否已經登入
    if (this.authService.isLoggedIn()) {
      return true;
    }else {
      // 導向登入頁面
      this.router.navigate(['/Login']);
      return false;
    }
  }

}
