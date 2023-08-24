import { Component, OnInit } from '@angular/core';
import { concat, interval, mergeMap, Observable, share, switchMap, timer } from 'rxjs';
import { DataService } from '../data.service';


export interface PeriodicElement {
  name: string;
  status: string;
}

@Component({
  selector: 'app-dau',
  templateUrl: './dau.component.html',
  styleUrls: ['./dau.component.css']
})
export class DAUComponent implements OnInit {

  selected1: any;
  caseRoleKey: any;
  caseRoleKeyList: any;

  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  dataSource: PeriodicElement[] = [];

  data$ = new Observable<any>();
  data2$ = new Observable<any>();
  data3$ = new Observable<any>();

  title!: string;

  showSpinner = false;

  constructor(public datasvc: DataService) {

  }

  ngOnInit(): void {
    this.showSpinner = true;
    this.data$ = this.datasvc.getSelected();
    this.data$.subscribe((x)=>{
      console.log(x);
      this.selected1 = x;

      this.data2$ = this.datasvc.getCaseList();   // 所有案場 caseRoleKey
      this.data2$.pipe(
        switchMap((caseRoleKeyList) => {
          this.caseRoleKeyList = caseRoleKeyList;

          // 使用 switchMap，在這裡觸發 InformationData 方法，執行第一次後每60秒執行一次
          return timer(0, 60000).pipe(
            switchMap(() => this.datasvc.DAU(this.caseRoleKeyList[this.selected1]))
          );
        })
      ).subscribe((x:any) => {
        console.log(x);
        this.title = x.name;
        this.displayedColumns = x.signalName;
        this.columnsToDisplay = x.signalName;
        this.dataSource = x.states;

        this.showSpinner = false;
      });
    })

    // const manualCall$ = this.datasvc.DAU();
    // const periodicCall$ = interval(60000).pipe(
    //   mergeMap(() => this.datasvc.DAU()),
    //   share()
    // );
    // this.data2$ = concat(manualCall$, periodicCall$);

    // //this.data$ = this.datasvc.DAU();
    // this.data2$.subscribe((x)=>{
    //   console.log(x);
    //   this.title = x[0].name;
    //   this.displayedColumns = x[0].signalName;
    //   this.columnsToDisplay = x[0].signalName;
    //   this.dataSource = x[0].states;
    // })
  }

}
