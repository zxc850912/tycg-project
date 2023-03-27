import { Component, OnInit } from '@angular/core';
import { concat, interval, mergeMap, Observable, share } from 'rxjs';
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

  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  dataSource: PeriodicElement[] = [];

  data$ = new Observable<any>();

  title!: string;

  constructor(public datasvc: DataService) {

    const manualCall$ = this.datasvc.DAU();
    const periodicCall$ = interval(60000).pipe(
      mergeMap(() => this.datasvc.DAU()),
      share()
    );
    this.data$ = concat(manualCall$, periodicCall$);

    //this.data$ = this.datasvc.DAU();
    this.data$.subscribe((x)=>{
      console.log(x);
      this.title = x[0].name;
      this.displayedColumns = x[0].signalName;
      this.columnsToDisplay = x[0].signalName;
      this.dataSource = x[0].states;
    })
  }

  ngOnInit(): void {
  }

}
