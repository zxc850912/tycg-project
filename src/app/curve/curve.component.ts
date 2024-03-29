import { Component, ElementRef, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ThemeOption } from 'ngx-echarts';
import { Observable, switchMap } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-curve',
  templateUrl: './curve.component.html',
  styleUrls: ['./curve.component.css']
})
export class CurveComponent implements OnInit {

  caseRoleKeyList: any;

  option1: any;
  showXAxisLabel = true;
  showTooltip = true;
  option2: any;

  data$ = new Observable<any>();
  data2$ = new Observable<any>();
  data3$ = new Observable<any>();
  data4$ = new Observable<any>();
  data5$ = new Observable<any>();
  data6$ = new Observable<any>();

  // startDate: any;
  // startTime: any;
  // endDate: any;
  // endTime: any;

  date7!: Date;

  startDay: any;
  endDay: any;
  // startDate = moment().format('YYYY-MM-DD');
  // startTime = '00:00';
  // endDate = moment().format('YYYY-MM-DD');
  // endTime = '23:59';

  selected1 = '';
  selected2 = '';
  selected3 = '';
  selected4 = '';
  // selected5 = '';

  chartData: any;
  scatterData: any;
  deviceData: any;
  item: any;
  setItem: any;
  itemName: any;
  titleItem: any;

  maxValue = '';
  minValue = '';

  targetName: any;
  Xaxis: any;
  Yaxis: any;

  showSpinner = false;

  // theme = 'dark';

  constructor(public datasvc: DataService) {

  }

  ngOnInit(): void {
    this.showSpinner = true;
    this.startDay = moment().startOf('day').toDate(); // 將字串轉換為 Date 物件
    this.endDay = moment().endOf('day').toDate();     // 將字串轉換為 Date 物件
    console.log(this.startDay,this.endDay);

    this.data$ = this.datasvc.getSelected();
    this.data$.subscribe((x)=>{
      console.log(x);
      this.selected1 = x;
    })

    this.data2$ = this.datasvc.getCaseList();   // 所有案場 caseRoleKey
    this.data2$.subscribe((x)=>{
      console.log(x);
      this.caseRoleKeyList = x;

      this.setItem = this.caseRoleKeyList[this.selected1];
    })

    this.data5$ = this.datasvc.CurveGuid();
    this.data5$.subscribe((x)=>{
      console.log(x);
      // console.log(x[0].guid);
      this.deviceData = x;
      // console.log(this.deviceData[0].name);
      this.titleItem = this.deviceData[0].name;
      // this.setItem = x[0].guid;
    })

    this.item = 'Tower Operating';
    // this.setItem = "5cbd1b8c-8eea-414f-bf9e-f981e9927864"

    const startDay = moment(this.startDay).format('YYYY-MM-DD HH:mm');
    const endDay = moment(this.endDay).format('YYYY-MM-DD HH:mm');

    var body = {
      "startTime": startDay,
      "endTime": endDay
    }
    console.log(body);

    this.data3$ = this.datasvc.CurveLineChart(this.item,this.setItem,body);
    this.data3$.subscribe((x)=>{
      console.log(x);
      console.log(x.xAxis);
      // console.log(x.series);

      const series = x.series.map((item: { name: string; }) => {
        if (item.name === 'WB') {
          return {
            ...item,
            name: 'WB',
            type: 'line',
            smooth: true,
            itemStyle: { color: '#5470c6' },
          };
        } else if (item.name === 'Inlet WB Temp') {
          return {
            ...item,
            name: 'Inlet WB Temp',
            type: 'line',
            smooth: true,
            itemStyle: { color: '#5470c6' },
          };
        } else if (item.name === 'Outlet WB Temp') {
          return {
            ...item,
            name: 'Outlet WB Temp',
            type: 'line',
            smooth: true,
            itemStyle: { color: '#986C6A' },
          };
        } else if (item.name === 'Range') {
          return {
            ...item,
            name: 'Range',
            type: 'line',
            smooth: true,
            itemStyle: { color: '#D5B0AC' },
          };
        } else if (item.name === 'Appr') {
          return {
            ...item,
            name: 'Appr',
            type: 'line',
            smooth: true,
            itemStyle: { color: '#fac858' },
          };
        } else if (item.name === 'Cold water') {
          return {
            ...item,
            name: 'Cold water',
            type: 'line',
            smooth: true,
            itemStyle: { color: '#0087CB' },
          };
        } else if (item.name === 'Cold Water Temp') {
          return {
            ...item,
            name: 'Cold Water Temp',
            type: 'line',
            smooth: true,
            itemStyle: { color: '#0087CB' },
          };
        } else if (item.name === 'Hot water') {
          return {
            ...item,
            name: 'Hot water',
            type: 'line',
            smooth: true,
            itemStyle: { color: '#CC0063' },
          };
        } else if (item.name === 'Hot Water Temp') {
          return {
            ...item,
            name: 'Hot Water Temp',
            type: 'line',
            smooth: true,
            itemStyle: { color: '#CC0063' },
          };
        } else {
          return item;
        }
      });

      this.option1 = {
        //其他圖表配置
        color: ['#372772', '#91cc75', '#726DA8', '#F2BEFC', '#B2BD7E','#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#2A9D8F', '#A44200', '#986C6A'],
        //標題
        title: {
          text: this.deviceData[0].name + ' ' +  this.item,   //抽換標題
          x: 'center',
          y: '10px'
        },
        //移動到線上可看到資訊
        tooltip: {
          show: this.showTooltip,
          trigger: 'axis',
          axisPointer: {
            type: "shadow"
          }
        },
        //顯示在上方線名稱的篩選
        legend: {
          top: '8%'
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {},
        //     dataZoom: {
        //       yAxisIndex: 'none'
        //     },
        //   }
        // },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 65,
            end: 85
          },
          {
            type: 'inside',
            realtime: true,
            start: 65,
            end: 85
          }
        ],
        xAxis: {
          type: 'category',
          axisLabel: {
            rotate: 30,
            interval: 10,
            show: this.showXAxisLabel,
          },
          boundaryGap: false,
          data: x.xAxis,    //匯入X軸標題
        },
        yAxis: {
          scale: true,
          // name: '%',
          type: 'value',
        },
        series: series,   //匯入資料
      };
      this.showSpinner = false;
    })

    this.data$ = this.datasvc.CurveItem();
    this.data$.subscribe((x)=>{
      // console.log(x);
      this.chartData = x;
    })

    this.data4$ = this.datasvc.CurveScatterItem();
    this.data4$.subscribe((x)=>{
      // console.log(x);
      this.scatterData = x;
    })
  }

  startDate($event: any){
    console.log($event);
    const ttp = moment($event).format('YYYY-MM-DD HH:mm');
    console.log(ttp);
  }

  endDate($event: any){
    console.log($event);
    const ttp = moment($event).format('YYYY-MM-DD HH:mm');
    console.log(ttp);
  }

  checkDateRange() {
    if (moment(this.startDay).isAfter(this.endDay)) {
      // 如果起始日期晚於結束日期，將起始日期設定為結束日期
      this.startDay = this.endDay;
    }
  }

  // logStartDate($event: any){
  //   this.startDate = moment($event).format('YYYY-MM-DD');
  //   // console.log(this.startDate);
  // }

  // logStartTime($event: any){
  //   // this.start = moment($event.value).format('HH:mm');
  //   this.startTime = $event;
  //   console.log(this.startTime);
  // }

  logStartTime(){
    // console.log(this.startTime);
  }


  // logEndDate($event: any){
  //   this.endDate = moment($event).format('YYYY-MM-DD');
  //   // console.log(this.endDate);
  // }

  // logEndTime($event: any){
  //   // this.start = moment($event.value).format('HH:mm');
  //   this.endTime = $event;
  //   console.log(this.endTime);
  // }
  logEndTime(){
    // console.log(this.endTime);
  }

  getData(){
    this.data2$ = this.chartData[this.selected1];
    // console.log(this.data2$);
    this.item = this.data2$;
    console.log(this.item);
  }

  // getGuid(){
  //   this.data6$ = this.datasvc.CurveGuid();
  //   this.data6$.subscribe((x)=>{
  //     this.itemName = x[this.selected5].name;
  //     // console.log(this.itemName);
  //   })
  // }

  getName(){
    this.targetName = this.scatterData[this.selected2];
    // console.log(this.targetName);
  }

  getXaxis(){
    this.Xaxis = this.scatterData[this.selected3];
    // console.log(this.Xaxis);
  }

  getYaxis(){
    this.Yaxis = this.scatterData[this.selected4];
    // console.log(this.Yaxis);
  }

  toggleXAxisLabel() {
    this.showXAxisLabel = !this.showXAxisLabel;
    this.option1 = {
      ...this.option1,
      xAxis: {
        ...this.option1.xAxis,
        axisLabel: {
          show: this.showXAxisLabel,
          rotate: 30,
          interval: 10,
        }
      }
    };
  }

  toggleTooltip() {
    this.showTooltip = !this.showTooltip;
    this.option1 = {
      ...this.option1,
      tooltip: {
        show: this.showTooltip,
        trigger: 'axis',
        axisPointer: {
          type: "shadow"
        }
      },
    };
  }

  demand(){
    this.showSpinner = true;

    const startDay = moment(this.startDay).format('YYYY-MM-DD HH:mm');
    const endDay = moment(this.endDay).format('YYYY-MM-DD HH:mm');

    var body = {
      "startTime": startDay,
      "endTime": endDay
    }

    console.log(this.item,this.setItem,body);

    this.data3$ = this.datasvc.CurveLineChart(this.item,this.setItem,body);
    // this.chartTitle = this.item;
    this.data3$.subscribe((x)=>{
      console.log(x);
      // console.log(x.xAxis);
      // console.log(x.series);

      const series = x.series.map((item: { name: string; }) => {
        if (item.name === 'WB') {
          return {
            ...item,
            name: 'WB',
            type: 'line',
            smooth: true,
            itemStyle: { color: '#5470c6' },
          };
        } else if (item.name === 'Inlet WB Temp') {
          return {
            ...item,
            name: 'Inlet WB Temp',
            type: 'line',
            smooth: true,
            itemStyle: { color: '#5470c6' },
          };
        } else if (item.name === 'Outlet WB Temp') {
          return {
            ...item,
            name: 'Outlet WB Temp',
            type: 'line',
            smooth: true,
            itemStyle: { color: '#986C6A' },
          };
        } else if (item.name === 'Range') {
          return {
            ...item,
            name: 'Range',
            type: 'line',
            smooth: true,
            itemStyle: { color: '#D5B0AC' },
          };
        } else if (item.name === 'Appr') {
          return {
            ...item,
            name: 'Appr',
            type: 'line',
            smooth: true,
            itemStyle: { color: '#fac858' },
          };
        } else if (item.name === 'Cold water') {
          return {
            ...item,
            name: 'Cold water',
            type: 'line',
            smooth: true,
            itemStyle: { color: '#0087CB' },
          };
        } else if (item.name === 'Cold Water Temp') {
          return {
            ...item,
            name: 'Cold Water Temp',
            type: 'line',
            smooth: true,
            itemStyle: { color: '#0087CB' },
          };
        } else if (item.name === 'Hot water') {
          return {
            ...item,
            name: 'Hot water',
            type: 'line',
            smooth: true,
            itemStyle: { color: '#CC0063' },
          };
        } else if (item.name === 'Hot Water Temp') {
          return {
            ...item,
            name: 'Hot Water Temp',
            type: 'line',
            smooth: true,
            itemStyle: { color: '#CC0063' },
          };
        } else {
          return item;
        }
      });


      this.option1 = {
        color: ['#372772', '#91cc75', '#726DA8', '#F2BEFC', '#B2BD7E','#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#2A9D8F', '#A44200', '#986C6A'],
        //標題
        title: {
          text: this.deviceData[0].name + ' ' + this.data2$,   //抽換標題
          x: 'center',
          y: '10px'
        },
        //移動到線上可看到資訊
        tooltip: {
          show: this.showTooltip,
          trigger: 'axis',
          axisPointer: {
            type: "shadow"
          }
        },
        //顯示在上方線名稱的篩選
        legend: {
          top: '8%'
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 65,
            end: 85
          },
          {
            type: 'inside',
            realtime: true,
            start: 65,
            end: 85
          }
        ],
        xAxis: {
          show: true,
          type: 'category',
          axisLabel: {
            show: this.showXAxisLabel, // 顯示X軸label的開關控制
            rotate: 30,
            interval: 10,
          },
          boundaryGap: false,
          data: x.xAxis,    //匯入X軸標題
        },
        yAxis: {
          scale: true,
          // name: '%',
          type: 'value',
        },
        series: series,   //匯入資料
      };
      this.showSpinner = false;
    })
  }


  scatterDemand(){
    this.showSpinner = true;
    const startDay = moment(this.startDay).format('YYYY-MM-DD HH:mm');
    const endDay = moment(this.endDay).format('YYYY-MM-DD HH:mm');

    var body = {
      "startTime": startDay,
      "endTime": endDay
    }

    if (this.minValue > this.maxValue) {
      alert('The Max value cannot be less than the Min value !');
      this.showSpinner = false;
      this.minValue = '';
      this.maxValue = '';
      return;
    }
    this.data3$ = this.datasvc.CurveScatterChart(this.setItem,this.targetName,this.maxValue,this.minValue,this.Xaxis,this.Yaxis,body);
    this.data3$.subscribe((x)=>{
      // console.log(x);
      this.option2 = {
        title: {
          text: this.deviceData[0].name + ' ' + this.targetName,   //抽換標題
          x: 'center',
          y: '10px'
        },
        //移動到線上可看到資訊
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: 'value',
          min: 0,
          max: 60, // 設定 x 軸的最大值，根據您的數據範圍調整
          scale: true,
          axisLabel: {
            rotate: 30,
            // interval: 10
          },
          boundaryGap: false,
          name:
            this.Xaxis,
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 60, // 設定 x 軸的最大值，根據您的數據範圍調整
          scale: true,
          name: this.Yaxis,
          nameTextStyle:{
            padding:[0,150,0,0]
          },
        },
        series: [
          {
            type: 'scatter',
            symbolSize: 5,
            data: x.data
          }
        ],
      };
      this.showSpinner = false;
    })
  }
}
