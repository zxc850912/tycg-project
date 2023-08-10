import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { concat, interval, mergeMap, Observable, share } from 'rxjs';
import { DataService } from '../data.service';


// export interface mainData{
//   mainTitle: string;
//   fan_Power_A: number;
//   rangeTemp: number;
//   inlet_Air_WB: number;
//   approach: number;
//   hot_Water: number;
//   cool_Water: number;
//   pump_Power_A: number;
//   water_Flow: number;
//   cellDatas: number;
// }

// export interface leftData{
//   leftTitle: string;
//   cell_Type: number;
//   inlet_Air_WB: number;
// }

// export interface rightData{
//   rightTitle: string;
//   cell_Type: number;
//   inlet_Air_WB: number;
// }


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

  selected1 = 'item';

  dataList: any;
  // title!: string;
  // fan_Power_A!: number;
  // inlet_Air_WB!: number;
  // rangeTemp!: number;
  // approach!: number;
  // hot_Water!: number;
  // cool_Water!: number;
  // pump_Power_A!: number;
  // water_Flow!: number;
  // cell_1!: string;
  // cell_2!: string;
  // inlet_Air_WB1!: number;
  // inlet_Air_WB2!: number;

  // displayedColumns: string[] = [];
  // columnsToDisplay: string[] = [];
  // dataSource: mainData[] = [];

  constructor(public datasvc: DataService) {

    const manualCall$ = this.datasvc.SystemScope();
    const periodicCall$ = interval(60000).pipe(
      mergeMap(() => this.datasvc.SystemScope()),
      share()
    );
    this.data$ = concat(manualCall$, periodicCall$);

    //this.data$ = this.datasvc.SystemScope();
    this.data$.subscribe((x)=>{
      // console.log(x);
      this.dataList = x;
      // this.title = x.setDatas[0].name;
      // this.fan_Power_A = x.setDatas[0].fan_Power_A;
      // this.inlet_Air_WB = x.setDatas[0].inlet_Air_WB;
      // this.rangeTemp = x.setDatas[0].rangeTemp;
      // console.log(this.rangeTemp);
      // this.approach = x.setDatas[0].approach;
      // console.log(this.approach);
      // this.hot_Water = x.setDatas[0].hot_Water;
      // this.cool_Water = x.setDatas[0].cool_Water;
      // this.pump_Power_A = x.setDatas[0].pump_Power_A;
      // this.water_Flow = x.setDatas[0].water_Flow;
      // this.cell_1 = x.setDatas[0].cellDatas[0].name;
      // this.cell_2 = x.setDatas[0].cellDatas[1].name;
      // this.inlet_Air_WB1 = x.setDatas[0].cellDatas[0].inlet_Air_WB;
      // this.inlet_Air_WB2 = x.setDatas[0].cellDatas[1].inlet_Air_WB;


    })
  }

  public Array = Array;

  getDevice(){

  }

  ngOnInit(): void {
  }



}
