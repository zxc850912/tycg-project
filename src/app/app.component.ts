import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //encapsulation: ViewEncapsulation.None   加上後可更改css而不受影響
})
export class AppComponent {
  title = 'tycg';


  constructor() {

  }


}
