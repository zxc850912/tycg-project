import { animate, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';
import { combineLatest, concat, delay, filter, interval, map, mergeMap, Observable, share, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';


export interface PeriodicElement{
  cell_No: string;
  status: string;
  fan_Status: number;
  fan_Power_A: string;
  fan_Fq: string;
  pump_Status: string;
  pump_Power_A: string;
  pump_Fq: string;
  water_Flow: string;
  hot_Water: string;
  cool_Water: string;
  range: string;
  inlet_Air_WB: string;
  approach: string;
  // dV1: string;
  // dV2: string;
  // temp_Abnormal: string;
  // fan_Power_Abnormal: string;
  // pump_Power_Abnormal: string;
  // performance_Abnormal: string;
}

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  //淡入淡出動畫
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2000ms ease', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('2000ms ease', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {

  caseList: any;

  selected1: any;

  tabGroupAnimation: string = 'fadeInOut';
  pageTitle = 'System Scope';
  time: any;
  deviceList: any;
  deviceName: any;

  data$ = new Observable<any>();
  data2$ = new Observable<any>();

  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  dataSource: PeriodicElement[] = [];


  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  private dataSubscription: Subscription | undefined;

  constructor(private observer: BreakpointObserver, private router: Router, public datasvc: DataService,private authService: AuthService) {

  }

  ngOnInit(): void {
    setInterval(() => {
      this.time = moment().format('YYYY-MM-DD HH:mm:ss');
    }, 1);

    const manualCall$ = this.datasvc.InformationData();
    const periodicCall$ = interval(60000).pipe(
      mergeMap(() => this.datasvc.InformationData()),
      share()
    );
    this.data$ = concat(manualCall$, periodicCall$);

    this.data$.subscribe((x)=>{
      this.displayedColumns = x.titleName;
      this.columnsToDisplay = x.titleName;
      this.deviceList = x.titleNums;
    })
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  ngOnDestroy(): void {
    // 在組件銷毀時取消訂閱
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  changeCase(){

  }

  onButtonClick(buttonText: string) {
    this.pageTitle = buttonText; // 更新 sidebarSelect 變量
    localStorage.setItem('lastSelectedButton', buttonText);
  }


  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/Login');
  }
}
