import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as saveAs from 'file-saver';
import { Observable, switchMap } from 'rxjs';
import { DataService } from '../data.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';


@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
  ],
})
export class ExportComponent implements OnInit {

  caseRoleKeyList: any;
  nameList: any;

  startDate: any;
  month: any;
  start = moment().format('YYYY-MM-DD');
  end = moment().format('YYYY-MM-DD');

  selected1: any;
  selected2 = 0;

  data$ = new Observable<any>();
  data2$ = new Observable<any>();
  data3$ = new Observable<any>();
  data4$ = new Observable<any>();
  data5$ = new Observable<any>();

  deviceList: any;
  deviceName: any;
  itemList: any;

  reportName: any;
  setItem: any;
  downloadItem: any;

  date = new FormControl(moment());

  showSpinner = false;

  constructor(public datasvc: DataService) {

  }

  ngOnInit(): void {
    this.data$ = this.datasvc.getSelected();
    this.data$.subscribe((x)=>{
      console.log(x);
      this.selected1 = x;
    })

    this.data2$ = this.datasvc.getNameList();
    this.data2$.subscribe((x)=>{
      console.log(x);
      this.nameList = x;
    })

    this.data3$ = this.datasvc.getCaseList();   // 所有案場 caseRoleKey
    this.data3$.subscribe((x)=>{
      console.log(x);
      this.caseRoleKeyList = x;
    })

    this.data4$ = this.datasvc.ExportItem();    // 取得下拉項目
    this.data4$.subscribe((x)=>{
      console.log(x);
      this.itemList = x;

      this.downloadItem = this.itemList[this.selected2];    //設定項目下拉預設值
    })

    // 設定日期預設值
    const today = moment();
    this.month = today.format('YYYY/MM');
    this.start = this.month + "/01";
    this.end = this.month + "/" + today.daysInMonth();

    // this.data3$ = this.datasvc.ExportMainItem();
    // this.data3$.subscribe((x)=>{
    //   // console.log(x);
    //   this.deviceList = x;
    //   this.deviceName = x[0].name;
    //   // console.log(this.deviceName);
    // })
  }

  setMonthAndYear(normalizedMonthAndYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();

    this.month = moment(ctrlValue).format('YYYY/MM');
    // console.log(this.month);
    // console.log(moment(this.month).daysInMonth())
    this.start = this.month + "/" + 1;
    // console.log(this.start);
    this.end = this.month + "/" + moment(this.month).daysInMonth();
    // console.log(this.end);
  }

  logStartDate($event: any){
    this.startDate = moment($event).format('YYYY-MM-DD');
    // console.log(this.startDate);
  }

  // getItem(){
  //   this.data3$ = this.datasvc.ExportItem();
  //   this.data3$.subscribe((x)=>{
  //     // console.log(x);
  //     this.itemList = x;
  //   })

  //   this.setItem = this.deviceList[this.selected1].guid;
  //   // console.log(this.setItem);
  // }

  getData(){
    // console.log(this.itemList[this.selected2]);
    this.downloadItem = this.itemList[this.selected2];
    // console.log(this.downloadItem);
  }

  downLoad(){
    this.showSpinner = true;
    this.setItem = this.caseRoleKeyList[this.selected1];
    this.deviceName = this.nameList[this.selected1];
    var body = {
      "startTime": this.start,
      "endTime": this.end
    };
    // console.log(body);
    var option = { responseType: "blob" as "json" };


    this.reportName = this.deviceName + this.downloadItem + "_" + this.month + ".xlsx";
    // console.log(this.reportName);


    this.data5$ = this.datasvc.ExportDownload(this.setItem,this.downloadItem,body,option);
    this.data5$.subscribe((x)=>{
      console.log(x);

      const data: Blob = new Blob([x], {
        type: "text/xlsx;charset=utf-8"
      });
      saveAs(data,this.reportName);
      this.showSpinner = false;
    })
  }

}
