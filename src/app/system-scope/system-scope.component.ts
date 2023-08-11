import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { concat, interval, mergeMap, Observable, share, switchMap, timer } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-system-scope',
  templateUrl: './system-scope.component.html',
  styleUrls: ['./system-scope.component.css'],
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

export class SystemScopeComponent implements OnInit {

  tabGroupAnimation: string = 'fadeInOut';
  data$ = new Observable<any>();
  data2$ = new Observable<any>();

  selected1 = 0;
  caseRoleKeyList: any;

  dataList: any;

  public Array = Array;

  constructor(public datasvc: DataService) {
    // const manualCall$ = this.datasvc.SystemScope();
    // const periodicCall$ = interval(60000).pipe(
    //   mergeMap(() => this.datasvc.SystemScope()),
    //   share()
    // );
    // this.data$ = concat(manualCall$, periodicCall$);

    // this.data$.subscribe((x)=>{
    //   // console.log(x);
    //   this.dataList = x;
    // })
  }

  ngOnInit(): void {
    this.data$ = this.datasvc.getSelected();
    this.data$.subscribe((x)=>{
      console.log(x);
      this.selected1 = x;
    })

    this.data2$ = this.datasvc.getCaseList();   // 所有案場 caseRoleKey
    this.data2$.pipe(
      switchMap((caseRoleKeyList) => {
        this.caseRoleKeyList = caseRoleKeyList;

        // 使用 switchMap，在這裡觸發 InformationData 方法，執行第一次後每60秒執行一次
        return timer(0, 60000).pipe(
          switchMap(() => this.datasvc.SystemScope(this.caseRoleKeyList[this.selected1]))
        );
      })
    ).subscribe((x:any) => {
      console.log(x);
      this.dataList = x;
    });
  }

  getDevice(){

  }

}
