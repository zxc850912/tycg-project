import { Component, OnInit } from '@angular/core';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  test: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', test: 1},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', test: 1},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', test: 2},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', test: 1},
];

@Component({
  selector: 'app-advance-data',
  templateUrl: './advance-data.component.html',
  styleUrls: ['./advance-data.component.css']
})
export class AdvanceDataComponent implements OnInit {

  bgColor: string = "red";

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor() {
    // console.log(this.dataSource[0].test);
    for(let i = 0;i<this.dataSource.length-1;i ++){
      console.log(this.dataSource[i].test);
      if(this.dataSource[i].test = 1){
        this.bgColor = "DarkBlue";
      }else if(this.dataSource[i].test = 2){
        this.bgColor = "LightBlue";
      }
    }
  }

  ngOnInit(): void {
  }

  DarkBlue(){
    this.bgColor = "DarkBlue";
  }

  LightBlue(){
    this.bgColor = "LightBlue";
  }

}
