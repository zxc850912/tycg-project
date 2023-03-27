import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-test-area',
  templateUrl: './test-area.component.html',
  styleUrls: ['./test-area.component.css']
})
export class TestAreaComponent implements OnInit {

  panelOpenState = false;
  // accordionItems = [
  //   {
  //     title: '8樓水塔',
  //     data: [
  //       {
  //         "set_No": "8樓水塔",
  //         "cell_No": "8樓水塔",
  //         "device_Type": 0,
  //         "status": "",
  //         "fan_Status": "",
  //         "fan_Power_A": "",
  //         "fan_Fq": "",
  //         "pump_Status": "ON",
  //         "pump_Power_A": "0",
  //         "pump_Fq": "0",
  //         "water_Flow": "335.00",
  //         "hot_Water": "25.75",
  //         "cool_Water": "23.69",
  //         "range": "2.06",
  //         "inlet_Air_WB": "15.96",
  //         "approach": "7.73",
  //         "dV1": "32.61",
  //         "dV2": "",
  //         "temp_Abnormal": "",
  //         "fan_Power_Abnormal": "",
  //         "pump_Power_Abnormal": "",
  //         "performance_Abnormal": ""
  //       },
  //       {
  //         "set_No": "8樓水塔",
  //         "cell_No": "左側水塔",
  //         "device_Type": 1,
  //         "status": "OFF",
  //         "fan_Status": "OFF",
  //         "fan_Power_A": "0.00",
  //         "fan_Fq": "0",
  //         "pump_Status": "",
  //         "pump_Power_A": "",
  //         "pump_Fq": "",
  //         "water_Flow": "",
  //         "hot_Water": "",
  //         "cool_Water": "",
  //         "range": "",
  //         "inlet_Air_WB": "15.95",
  //         "approach": "",
  //         "dV1": "0.00",
  //         "dV2": "",
  //         "temp_Abnormal": "",
  //         "fan_Power_Abnormal": "",
  //         "pump_Power_Abnormal": "",
  //         "performance_Abnormal": ""
  //       },
  //       {
  //         "set_No": "8樓水塔",
  //         "cell_No": "右側水塔",
  //         "device_Type": 1,
  //         "status": "ON",
  //         "fan_Status": "ON",
  //         "fan_Power_A": "14.34",
  //         "fan_Fq": "60",
  //         "pump_Status": "",
  //         "pump_Power_A": "",
  //         "pump_Fq": "",
  //         "water_Flow": "",
  //         "hot_Water": "",
  //         "cool_Water": "",
  //         "range": "",
  //         "inlet_Air_WB": "15.97",
  //         "approach": "",
  //         "dV1": "65.22",
  //         "dV2": "",
  //         "temp_Abnormal": "",
  //         "fan_Power_Abnormal": "",
  //         "pump_Power_Abnormal": "",
  //         "performance_Abnormal": ""
  //       }
  //     ]
  //   },
  //   {
  //     title: '16樓水塔',
  //     data: [
  //       {
  //         "set_No": "16樓水塔",
  //         "cell_No": "16樓水塔",
  //         "device_Type": 0,
  //         "status": "",
  //         "fan_Status": "",
  //         "fan_Power_A": "",
  //         "fan_Fq": "",
  //         "pump_Status": "ON",
  //         "pump_Power_A": "0",
  //         "pump_Fq": "0",
  //         "water_Flow": "335.00",
  //         "hot_Water": "25.75",
  //         "cool_Water": "23.69",
  //         "range": "2.06",
  //         "inlet_Air_WB": "15.96",
  //         "approach": "7.73",
  //         "dV1": "32.61",
  //         "dV2": "",
  //         "temp_Abnormal": "",
  //         "fan_Power_Abnormal": "",
  //         "pump_Power_Abnormal": "",
  //         "performance_Abnormal": ""
  //       },
  //       {
  //         "set_No": "16樓水塔",
  //         "cell_No": "左側水塔",
  //         "device_Type": 1,
  //         "status": "OFF",
  //         "fan_Status": "OFF",
  //         "fan_Power_A": "0.00",
  //         "fan_Fq": "0",
  //         "pump_Status": "",
  //         "pump_Power_A": "",
  //         "pump_Fq": "",
  //         "water_Flow": "",
  //         "hot_Water": "",
  //         "cool_Water": "",
  //         "range": "",
  //         "inlet_Air_WB": "15.95",
  //         "approach": "",
  //         "dV1": "0.00",
  //         "dV2": "",
  //         "temp_Abnormal": "",
  //         "fan_Power_Abnormal": "",
  //         "pump_Power_Abnormal": "",
  //         "performance_Abnormal": ""
  //       },
  //       {
  //         "set_No": "16樓水塔",
  //         "cell_No": "右側水塔",
  //         "device_Type": 1,
  //         "status": "ON",
  //         "fan_Status": "ON",
  //         "fan_Power_A": "14.34",
  //         "fan_Fq": "60",
  //         "pump_Status": "",
  //         "pump_Power_A": "",
  //         "pump_Fq": "",
  //         "water_Flow": "",
  //         "hot_Water": "",
  //         "cool_Water": "",
  //         "range": "",
  //         "inlet_Air_WB": "15.97",
  //         "approach": "",
  //         "dV1": "65.22",
  //         "dV2": "",
  //         "temp_Abnormal": "",
  //         "fan_Power_Abnormal": "",
  //         "pump_Power_Abnormal": "",
  //         "performance_Abnormal": ""
  //       }
  //     ]
  //   },
  // ];

//   displayedColumns = [
//   "set_No",
//   "cell_No",
//   "device_Type",
//   "status",
//   "fan_Status",
//   "fan_Power_A",
//   "fan_Fq",
//   "pump_Status",
//   "pump_Power_A",
//   "pump_Fq",
//   "water_Flow",
//   "hot_Water",
//   "cool_Water",
//   "range",
//   "inlet_Air_WB",
//   "approach",
//   "dV1",
//   "dV2",
//   "temp_Abnormal",
//   "fan_Power_Abnormal",
//   "pump_Power_Abnormal",
//   "performance_Abnormal"
// ];
//   columnsToDisplay = [
//   "set_No",
//   "cell_No",
//   "device_Type",
//   "status",
//   "fan_Status",
//   "fan_Power_A",
//   "fan_Fq",
//   "pump_Status",
//   "pump_Power_A",
//   "pump_Fq",
//   "water_Flow",
//   "hot_Water",
//   "cool_Water",
//   "range",
//   "inlet_Air_WB",
//   "approach",
//   "dV1",
//   "dV2",
//   "temp_Abnormal",
//   "fan_Power_Abnormal",
//   "pump_Power_Abnormal",
//   "performance_Abnormal"
//   ];

  tabs = [
    {
      title: '8樓水塔',
      data: [
        {
          "name": "8樓水塔",
          "test": "橫式",
          "images": 2,
          "fan_Power_A": 0,
          "rangeTemp": 1.97,
          "inlet_Air_WB": 17.25,
          "approach": 6.64,
          "hot_Water": 25.86,
          "cool_Water": 23.89,
          "pump_Power_A": 0,
          "water_Flow": 336.53,
          "cellDatas": [
            {
              "name": "左側水塔",
              "cell_Type": 0,
              "inlet_Air_WB": 17.28
            },
            {
              "name": "右側水塔",
              "cell_Type": 0,
              "inlet_Air_WB": 17.22
            }
          ]
        }
      ]
    },
    {
      title: '16樓水塔',
      data: [
        {
          "name": "16樓水塔",
          "test": "直式",
          "images": 5,
          "fan_Power_A": 0,
          "rangeTemp": 1.97,
          "inlet_Air_WB": 17.25,
          "approach": 6.64,
          "hot_Water": 25.86,
          "cool_Water": 23.89,
          "pump_Power_A": 0,
          "water_Flow": 336.53,
          "cellDatas": [
            {
              "name": "1號水塔",
              "cell_Type": 0,
              "inlet_Air_WB": 17.28
            },
            {
              "name": "2號水塔",
              "cell_Type": 0,
              "inlet_Air_WB": 17.22
            },
            {
              "name": "3號水塔",
              "cell_Type": 0,
              "inlet_Air_WB": 17.22
            },
            {
              "name": "4號水塔",
              "cell_Type": 0,
              "inlet_Air_WB": 17.23
            },
            {
              "name": "5號水塔",
              "cell_Type": 0,
              "inlet_Air_WB": 17.22
            }
          ]
        }
      ]
    }
  ];

  columnsToDisplay2 = [
    "name",
    "test",
    "fan_Power_A",
    "rangeTemp",
    "inlet_Air_WB",
    "approach",
    "hot_Water",
    "cool_Water",
    "pump_Power_A",
    "water_Flow",
    // "cellDatas"
  ];
  displayedColumns2 = [
    "name",
    "test",
    "fan_Power_A",
    "rangeTemp",
    "inlet_Air_WB",
    "approach",
    "hot_Water",
    "cool_Water",
    "pump_Power_A",
    "water_Flow",
    // "cellDatas"
  ];

  public Array = Array;

  constructor() {

  }

  ngOnInit(): void {

  }

}
