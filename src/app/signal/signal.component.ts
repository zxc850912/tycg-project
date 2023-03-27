import { Component, OnInit } from '@angular/core';
import { concat, interval, mergeMap, Observable, share } from 'rxjs';
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

  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  dataSource: PeriodicElement[] = [];

  data$ = new Observable<any>();
  title!: string;

  constructor(public datasvc: DataService) {

    const manualCall$ = this.datasvc.Signal();
    const periodicCall$ = interval(60000).pipe(
      mergeMap(() => this.datasvc.Signal()),
      share()
    );
    this.data$ = concat(manualCall$, periodicCall$);

    //this.data$ = this.datasvc.Signal();
    this.data$.subscribe((x)=>{
      console.log(x.equipments);
      this.title = x.name;

      this.displayedColumns = x.signalName;
      // console.log(this.displayedColumns);
      this.columnsToDisplay = x.signalName;
      this.dataSource = x.equipments;
      console.log(this.dataSource);
    })
  }

  ngOnInit(): void {
  }

}
