import { animate, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';
import { combineLatest, concat, delay, filter, interval, map, mergeMap, Observable, share, startWith, Subscription, switchMap, timer } from 'rxjs';
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

  caseList!: any[];
  caseRoleKeyList: any;

  // selected1 = 0;    //給一個預設的值
  selected1: any;

  tabGroupAnimation: string = 'fadeInOut';
  pageTitle = 'System Scope';
  time: any;
  deviceList: any;
  deviceName: any;

  data$ = new Observable<any>();
  data2$ = new Observable<any>();
  data3$ = new Observable<any>();
  data4$ = new Observable<any>();

  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  dataSource: PeriodicElement[] = [];


  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  private dataSubscription: Subscription | undefined;

  showSpinner = false;

  constructor(private observer: BreakpointObserver, private router: Router, public datasvc: DataService,private authService: AuthService) {

  }

  ngOnInit(): void {
    this.showSpinner = true;
    setInterval(() => {
      this.time = moment().format('YYYY-MM-DD HH:mm:ss');
    }, 1000);

    this.data$ = this.datasvc.getNameList();    // 所有案場下拉選單
    this.data$.subscribe((x)=>{
      if (x.length > 0){
        console.log(x);
        this.caseList = x;

        this.data2$ = this.datasvc.getCaseList();   // 所有案場 caseRoleKey
        this.data2$.subscribe((x) => {
          if (x.length > 0){
            console.log(x);
            this.caseRoleKeyList = x;
            // this.datasvc.setSelected(this.selected1);   // 把預設值傳入
            this.data4$ = this.datasvc.getSelected();
            this.data4$.subscribe((x) => {
              console.log(x);
              this.selected1 = x;

              const manualCall$ = this.datasvc.InformationData(this.caseRoleKeyList[this.selected1]);     //建立第一個觀察者物件
              const periodicCall$ = interval(60000).pipe(             //建立第二個觀察者物件,並每60秒執行一次
                mergeMap(() => this.datasvc.InformationData(this.caseRoleKeyList[this.selected1])),
                share()
              );

              this.data3$ = concat(manualCall$, periodicCall$);        //使用concat()將觀察者物件串接起來,內容會依序執行,但因為periodicCall$有計時器,所以會持續執行,manualCall$則執行完一次就停止
              this.data3$.subscribe((x)=>{                             //訂閱資料
                if (x){
                  console.log(x);
                  this.displayedColumns = x.titleName;
                  this.columnsToDisplay = x.titleName;
                  this.deviceList = x.titleNums;

                  this.showSpinner = false;
                }
              })
            })
          }
        })
      }
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
    console.log(this.caseRoleKeyList[this.selected1]);
    this.datasvc.setSelected(this.selected1);
  }

  onDropdownChange() {
    // this.selected1 = this.cities.indexOf(this.selectedCity);
    // console.log(this.caseRoleKeyList[this.selected1]);
    console.log(this.selected1);
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
