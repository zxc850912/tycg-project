import { Component, OnInit, QueryList, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';


export interface PeriodicElement2 {
  startTime: string;
  endTime: string;
  seasonStatus: string;
}

@Component({
  selector: 'app-system-setting',
  templateUrl: './system-setting.component.html',
  styleUrls: ['./system-setting.component.css']
})
export class SystemSettingComponent implements OnInit {

  showSpinner = false;
  //system pa.
  manufacturer: any;
  modelNo: any;
  type: any;
  totalWaterFlowrate: any;
  waterFlowRateCell: any;
  hotWaterTemp: any;
  coldWaterTemp: any;
  ambWetbulbTemp: any;
  evaporationLoss: any;
  dirftLoss: any;
  noOfCell: any;
  noOfFanCell: any;
  totalNoOfFan: any;
  airVolumePerFan: any;
  noCell: any;
  motorPowerSourcePhase: any;
  motorPowerSourceHz: any;
  motorPowerSourceVolt: any;
  motorNumberOfMotorPoles: any;
  motorRatedHP: any;
  motorRatedPower: any;
  motorRatedAmp: any;
  pumpPowerSourcePhase: any;
  pumpPowerSourceHz: any;
  pumpPowerSourceVolt: any;
  pumpNumberOfMotorPoles: any;
  pumpRatedHP: any;
  pumpRatedAmp: any;

  //電力參數
  fanOff: any;
  fanLowest: any;
  fanFull: any;
  fanOverLoad: any;
  pumpOff: any;
  pumpLowest: any;
  pumpFull: any;
  pumpOverLoad: any;

  //溫溼度計參數
  sensorTempLowest: any;
  sensorTempHightest: any;
  sensorRhLowest: any;
  sensorRhHightest: any;

  //BTU參數
  btu_btuHwtLowest: any;
  btu_btuHwtHightest: any;
  btu_btuHwtOver: any;
  btu_btuCwtLowest: any;
  btu_btuCwtHightest: any;
  btu_btuCwtOver: any;
  btu_btuFlowOff: any;
  btu_btuFlowOn: any;


  displayedColumns2: string[] = [];
  columnsToDisplay2: string[] = [];
  dataSource2: PeriodicElement2[] = [];

  data$ = new Observable<any>();
  data2$ = new Observable<any>();
  data3$ = new Observable<any>();

  startTimeList: any;
  endTimeList: any;

  setResponse: any;
  solarResponse: any;

  @ViewChild('saveBtn') saveBtn!:ElementRef;


  constructor(public datasvc: DataService) {
    this.data$ = datasvc.SystemSettingData();
    this.data$.subscribe((x)=>{
      // console.log(x);
      // console.log(x[0].set);
      this.manufacturer = x[0].set.manufacturer;
      this.modelNo = x[0].set.modelNo;
      this.type = x[0].set.type;
      this.totalWaterFlowrate = x[0].set.totalWaterFlowrate;
      this.waterFlowRateCell = x[0].set.waterFlowRateCell;
      this.hotWaterTemp = x[0].set.hotWaterTemp;
      this.coldWaterTemp = x[0].set.coldWaterTemp;
      this.ambWetbulbTemp = x[0].set.ambWetbulbTemp;
      this.evaporationLoss = x[0].set.evaporationLoss;
      this.dirftLoss = x[0].set.dirftLoss;
      this.noOfCell = x[0].set.noOfCell;
      this.noOfFanCell = x[0].set.noOfFanCell;
      this.totalNoOfFan = x[0].set.totalNoOfFan;
      this.airVolumePerFan = x[0].set.airVolumePerFan;
      this.noCell = x[0].set.noCell;
      this.motorPowerSourcePhase = x[0].set.motorPowerSourcePhase;
      this.motorPowerSourceHz = x[0].set.motorPowerSourceHz;
      this.motorPowerSourceVolt = x[0].set.motorPowerSourceVolt;
      this.motorNumberOfMotorPoles = x[0].set.motorNumberOfMotorPoles;
      this.motorRatedHP = x[0].set.motorRatedHP;
      this.motorRatedPower = x[0].set.motorRatedPower;
      this.motorRatedAmp = x[0].set.motorRatedAmp;
      this.pumpPowerSourcePhase = x[0].set.pumpPowerSourcePhase;
      this.pumpPowerSourceHz = x[0].set.pumpPowerSourceHz;
      this.pumpPowerSourceVolt = x[0].set.pumpPowerSourceVolt;
      this.pumpNumberOfMotorPoles = x[0].set.pumpNumberOfMotorPoles;
      this.pumpRatedHP = x[0].set.pumpRatedHP;
      this.pumpRatedAmp = x[0].set.pumpRatedAmp;

      // console.log(x[0].solar);
      // console.log(Object.keys(x[0].solar[0]));

      this.displayedColumns2 = ['startTime','endTime','seasonStatus'];
      this.columnsToDisplay2 = ['startTime','endTime','seasonStatus'];
      this.dataSource2 = x[0].solar;
      // console.log(this.dataSource2);

      this.fanOff = x[0].set.fanOff;
      this.fanLowest = x[0].set.fanLowest;
      this.fanFull = x[0].set.fanFull;
      this.fanOverLoad = x[0].set.fanOverLoad;
      this.pumpOff = x[0].set.pumpOff;
      this.pumpLowest = x[0].set.pumpLowest;
      this.pumpFull = x[0].set.pumpFull;
      this.pumpOverLoad = x[0].set.pumpOverLoad;

      this.sensorTempLowest = x[0].set.sensorTempLowest;
      this.sensorTempHightest = x[0].set.sensorTempHightest;
      this.sensorRhLowest = x[0].set.sensorRhLowest;
      this.sensorRhHightest = x[0].set.sensorRhHightest;

      this.btu_btuHwtLowest = x[0].set.btuHwtLowest;
      this.btu_btuHwtHightest = x[0].set.btuHwtHightest;
      this.btu_btuHwtOver = x[0].set.btuHwtOver;
      this.btu_btuCwtLowest = x[0].set.btuCwtLowest;
      this.btu_btuCwtHightest = x[0].set.btuCwtHightest;
      this.btu_btuCwtOver = x[0].set.btuCwtOver;
      this.btu_btuFlowOff = x[0].set.btuFlowOff;
      this.btu_btuFlowOn = x[0].set.btuFlowOn;

      this.startTimeList = x[0].solar.map((item: { startTime: any; }) => item.startTime);
      this.endTimeList = x[0].solar.map((item: { endTime: any; }) => item.endTime);
      // this.seasonStatusList = x[0].solar.map((item: { seasonStatus: any; }) => item.seasonStatus);
      // console.log(this.startTimeList);
    })
  }


  sendData(){
    var setBody = {
      "uid": "5cbd1b8c-8eea-414f-bf9e-f981e9927864",
      "towerName": "",
      "manufacturer": this.manufacturer,
      "modelNo": this.modelNo,
      "type": this.type,
      "totalWaterFlowrate": this.totalWaterFlowrate,
      "waterFlowRateCell": this.waterFlowRateCell,
      "hotWaterTemp": this.hotWaterTemp,
      "coldWaterTemp": this.coldWaterTemp,
      "ambWetbulbTemp": this.ambWetbulbTemp,
      "evaporationLoss": this.evaporationLoss,
      "dirftLoss": this.dirftLoss,
      "noOfCell": this.noOfCell,
      "noOfFanCell": this.noOfFanCell,
      "totalNoOfFan": this.totalNoOfFan,
      "airVolumePerFan": this.airVolumePerFan,
      "noCell": this.noCell,
      "motorPowerSourcePhase": this.motorPowerSourcePhase,
      "motorPowerSourceHz": this.motorPowerSourceHz,
      "motorPowerSourceVolt": this.motorPowerSourceVolt,
      "motorNumberOfMotorPoles": this.motorNumberOfMotorPoles,
      "motorRatedHP": this.motorRatedHP,
      "motorRatedPower": this.motorRatedPower,
      "motorRatedAmp": this.motorRatedAmp,
      "pumpPowerSourcePhase": this.pumpPowerSourcePhase,
      "pumpPowerSourceHz": this.pumpPowerSourceHz,
      "pumpPowerSourceVolt": this.pumpPowerSourceVolt,
      "pumpNumberOfMotorPoles": this.pumpNumberOfMotorPoles,
      "pumpRatedHP": this.pumpRatedHP,
      "pumpRatedAmp": this.pumpRatedAmp,
      "fanOff": this.fanOff,
      "fanLowest": this.fanLowest,
      "fanFull": this.fanFull,
      "fanOverLoad": this.fanOverLoad,
      "pumpOff": this.pumpOff,
      "pumpLowest": this.pumpLowest,
      "pumpFull": this.pumpFull,
      "pumpOverLoad": this.pumpOverLoad,
      "btuHwtLowest": this.btu_btuHwtLowest,
      "btuHwtHightest": this.btu_btuHwtHightest,
      "btuHwtOver": this.btu_btuHwtOver,
      "btuCwtLowest": this.btu_btuCwtLowest,
      "btuCwtHightest": this.btu_btuCwtHightest,
      "btuCwtOver": this.btu_btuCwtOver,
      "btuFlowOff": this.btu_btuFlowOff,
      "btuFlowOn": this.btu_btuFlowOn,
      "sensorTempLowest": this.sensorTempLowest,
      "sensorTempHightest": this.sensorTempHightest,
      "sensorRhLowest": this.sensorRhLowest,
      "sensorRhHightest": this.sensorRhHightest,
      "sunrise": "",
      "sunset": "",
      "sunStatus": "",
      "solarZenithAngle": "",
      "solarAzimuthAngle": "",
      "longitude": "",
      "latitude": ""
    };

    var inputs = document.querySelectorAll('input');
    var seasonStatusList: any[] = [];
    Array.from(inputs).slice(36, 48).forEach((input) => {
      // console.log(input.value);
      seasonStatusList.push(input.value);

      // const numArr = seasonStatusList.map(str => parseInt(str));
      // console.log(numArr);
    });
    // console.log(seasonStatusList);

    var solarBody = [
      {
        "uid": "5de2dbde-2528-46d8-9070-4d9c12df4f21",
        "setid": "5cbd1b8c-8eea-414f-bf9e-f981e9927864",
        "startTime": this.startTimeList[0],
        "endTime": this.endTimeList[0],
        "seasonStatus": seasonStatusList[0]
      },
      {
        "uid": "13ba4050-e637-452d-96b9-82f91e76206b",
        "setid": "5cbd1b8c-8eea-414f-bf9e-f981e9927864",
        "startTime": this.startTimeList[1],
        "endTime": this.endTimeList[1],
        "seasonStatus": seasonStatusList[1]
      },
      {
        "uid": "0ad21a05-9bed-44d7-99af-e4d9f04568fc",
        "setid": "5cbd1b8c-8eea-414f-bf9e-f981e9927864",
        "startTime": this.startTimeList[2],
        "endTime": this.endTimeList[2],
        "seasonStatus": seasonStatusList[2]
      },
      {
        "uid": "f9c3e5f5-63b1-4124-87d7-0c1a3261c7a7",
        "setid": "5cbd1b8c-8eea-414f-bf9e-f981e9927864",
        "startTime": this.startTimeList[3],
        "endTime": this.endTimeList[3],
        "seasonStatus": seasonStatusList[3]
      },
      {
        "uid": "e309d22c-9ce5-4eff-9a51-617cc9016f22",
        "setid": "5cbd1b8c-8eea-414f-bf9e-f981e9927864",
        "startTime": this.startTimeList[4],
        "endTime": this.endTimeList[4],
        "seasonStatus": seasonStatusList[4]
      },
      {
        "uid": "5b9c1983-3ac7-4235-9390-a2756d0dcb1f",
        "setid": "5cbd1b8c-8eea-414f-bf9e-f981e9927864",
        "startTime": this.startTimeList[5],
        "endTime": this.endTimeList[5],
        "seasonStatus": seasonStatusList[5]
      },
      {
        "uid": "c3e6ab91-9239-41b8-8362-fede3f669f6e",
        "setid": "5cbd1b8c-8eea-414f-bf9e-f981e9927864",
        "startTime": this.startTimeList[6],
        "endTime": this.endTimeList[6],
        "seasonStatus": seasonStatusList[6]
      },
      {
        "uid": "961aff6b-0828-4247-8af5-82572f61e2f8",
        "setid": "5cbd1b8c-8eea-414f-bf9e-f981e9927864",
        "startTime": this.startTimeList[7],
        "endTime": this.endTimeList[7],
        "seasonStatus": seasonStatusList[7]
      },
      {
        "uid": "2a67b1b5-aabb-4840-9176-e1d160270d36",
        "setid": "5cbd1b8c-8eea-414f-bf9e-f981e9927864",
        "startTime": this.startTimeList[8],
        "endTime": this.endTimeList[8],
        "seasonStatus": seasonStatusList[8]
      },
      {
        "uid": "690f446c-9b53-45e1-8b4e-f61cb83bb34c",
        "setid": "5cbd1b8c-8eea-414f-bf9e-f981e9927864",
        "startTime": this.startTimeList[9],
        "endTime": this.endTimeList[9],
        "seasonStatus": seasonStatusList[9]
      },
      {
        "uid": "4a67dae8-dd89-4b2a-a1a9-dc26ad61cf59",
        "setid": "5cbd1b8c-8eea-414f-bf9e-f981e9927864",
        "startTime": this.startTimeList[10],
        "endTime": this.endTimeList[10],
        "seasonStatus": seasonStatusList[10]
      },
      {
        "uid": "342b2156-31b2-4c2c-8248-a8afe8a977b0",
        "setid": "5cbd1b8c-8eea-414f-bf9e-f981e9927864",
        "startTime": this.startTimeList[11],
        "endTime": this.endTimeList[11],
        "seasonStatus": seasonStatusList[11]
      }
    ]



    this.data2$ = this.datasvc.SystemSettingPa(setBody);
    this.data2$.subscribe((x)=>{
      // console.log(x);   //這邊解析後回傳的是text,所以service那邊要給回傳型態,不然無法解析
      this.setResponse = x;
    })

    this.data3$ = this.datasvc.SystemSettingSunangle(solarBody);
    this.data3$.subscribe((x)=>{
      // console.log(x);   //同上
      this.solarResponse = x;
    })
    // console.log(setBody);
    // console.log(solarBody);
    if(this.setResponse = ".Pa Set updata succeeded" && (this.solarResponse = ".Pa Solar updata succeeded")){
      alert("uploaded successfully!");
    }
  }


  top(): void{
    this.saveBtn.nativeElement.scrollIntoView({behavior:'smooth',block:'start',inline:'start'});
  }


  ngOnInit(): void {

  }


}
