import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, switchMap, timer } from 'rxjs';


export interface PeriodicElement{
  temp: any;
  humidity: any;
  wetBulbTemp: any;
  dewPointTemp: any;
  absoluteHumidity: any;
  enthalpy: any;
  // in_Out_Flag: any;
  // guid: any;
  // name: any;
  // deviceType: any;
}


@Component({
  selector: 'app-advance-data',
  templateUrl: './advance-data.component.html',
  styleUrls: ['./advance-data.component.css']
})
export class AdvanceDataComponent implements OnInit {

  data$ = new Observable<any>();
  data2$ = new Observable<any>();
  data3$ = new Observable<any>();

  selected1: any;
  caseRoleKeyList: any;

  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  dataSource: PeriodicElement[] = [];

  displayedColumns2: string[] = [];
  columnsToDisplay2: string[] = [];
  dataSource2: PeriodicElement[] = [];

  setData: any;
  name: any;
  flowData: any;
  fanData: any;
  pumpData: any;
  environmental = 'environmental status';

  constructor(public datasvc: DataService) {

  }

  ngOnInit(): void {
    var interval;
    this.tableData();
    clearInterval(interval);
    interval = setInterval(() => {
      this.tableData();
    }, 60000);
  }

  tableData(){
    this.data$ = this.datasvc.getSelected();
    this.data$.subscribe((x)=>{
      console.log(x);
      this.selected1 = x;

      this.data2$ = this.datasvc.getCaseList();   // 所有案場 caseRoleKey
      this.data2$.subscribe((caseRoleKeyList)=>{
        this.caseRoleKeyList = caseRoleKeyList;

        this.data3$ = this.datasvc.advanceData(this.caseRoleKeyList[this.selected1]);
        this.data3$.subscribe((x)=>{
          console.log(x);
          console.log(x.set.flow);
          this.setData = x.set;
          this.name = this.setData.name;
          this.flowData = this.setData.flow;
          this.fanData = this.setData.fan;
          this.pumpData = this.setData.pump;

          // this.displayedColumns = ['temp', 'humidity', 'wetBulbTemp', 'dewPointTemp', 'absoluteHumidity', 'enthalpy'];
          this.displayedColumns = ['name', 'wetBulbTemp', 'temp','absoluteHumidity'];
          this.columnsToDisplay = ['name', 'wetBulbTemp', 'temp','absoluteHumidity'];

          this.displayedColumns2 = ['name', 'wetBulbTemp', 'temp','absoluteHumidity'];
          this.columnsToDisplay2 = ['name', 'wetBulbTemp', 'temp','absoluteHumidity'];
        })
      })
    })
  }
}
