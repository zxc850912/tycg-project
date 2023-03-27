import { Directive } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';


export var MY_FORMATS = {
  parse: {
    dateInput: "YYYY/MM",
  },
  display: {
    dateInput: "YYYY/MM",
    monthYearLabel: "YYYY MM",
    dateA11yLabel: "YYYY MM",
    monthYearA11yLabel: "YYYY MM",
  },
};

@Directive({
  selector: '[appMonth]',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class MonthDirective {

  constructor() { }

}
