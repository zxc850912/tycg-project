import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { AdvanceDataComponent } from './advance-data/advance-data.component';
import { SystemScopeComponent } from './system-scope/system-scope.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SignalComponent } from './signal/signal.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { CurveComponent } from './curve/curve.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { GraphicalSymbolsComponent } from './graphical-symbols/graphical-symbols.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DAUComponent } from './dau/dau.component';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmsComponent } from './ems/ems.component';
import { ReportComponent } from './report/report.component';
import { SystemSettingComponent } from './system-setting/system-setting.component';
import { ExportComponent } from './export/export.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MonthDirective } from './export/directives/month.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './login/login.component';
import { TestAreaComponent } from './test-area/test-area.component';
import { HomeComponent } from './home/home.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    AdvanceDataComponent,
    SystemScopeComponent,
    SignalComponent,
    CurveComponent,
    GraphicalSymbolsComponent,
    DAUComponent,
    EmsComponent,
    ReportComponent,
    SystemSettingComponent,
    ExportComponent,
    MonthDirective,
    LoginComponent,
    TestAreaComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatExpansionModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatMomentDateModule,
    MatSelectModule,
    NgxMatTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTabsModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  providers: [DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
