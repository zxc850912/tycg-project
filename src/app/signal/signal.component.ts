import { Component, OnInit } from '@angular/core';
import { concat, interval, mergeMap, Observable, share, switchMap, timer } from 'rxjs';
import { DataService } from '../data.service';


export interface PeriodicElement {
  name: string;
  flow: string;
  flow_Unite: string;
  sensor1: string;
  sensor1_Unite: string;
  sensor2: string;
  sensor2_Unite: string;
  connection: string;
}


@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.css']
})
export class SignalComponent implements OnInit {

  selected1: any;
  caseRoleKeyList: any;

  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  dataSource: PeriodicElement[] = [];

  data$ = new Observable<any>();
  data2$ = new Observable<any>();

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
            switchMap(() => this.datasvc.Signal(this.caseRoleKeyList[this.selected1]))
          );
        })
      ).subscribe((x:any) => {
        console.log(x);
        console.log(x.equipments);
        this.title = x.name;

        this.displayedColumns = x.signalName;
        // console.log(this.displayedColumns);
        this.columnsToDisplay = x.signalName;
        this.dataSource = x.equipments;
        // console.log(this.dataSource);
        this.showSpinner = false;
      });
    })

    // const manualCall$ = this.datasvc.Signal();
    // const periodicCall$ = interval(60000).pipe(
    //   mergeMap(() => this.datasvc.Signal()),
    //   share()
    // );
    // this.data$ = concat(manualCall$, periodicCall$);

    // //this.data$ = this.datasvc.Signal();
    // this.data$.subscribe((x)=>{
    //   // console.log(x.equipments);
    //   this.title = x.name;

    //   this.displayedColumns = x.signalName;
    //   // console.log(this.displayedColumns);
    //   this.columnsToDisplay = x.signalName;
    //   this.dataSource = x.equipments;
    //   // console.log(this.dataSource);
    // })
  }

}
