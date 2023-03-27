import { HomeComponent } from './home/home.component';
import { TestAreaComponent } from './test-area/test-area.component';
import { LoginComponent } from './login/login.component';
import { DAUComponent } from './dau/dau.component';
import { GraphicalSymbolsComponent } from './graphical-symbols/graphical-symbols.component';
import { CurveComponent } from './curve/curve.component';
import { SignalComponent } from './signal/signal.component';
import { SystemScopeComponent } from './system-scope/system-scope.component';
import { AdvanceDataComponent } from './advance-data/advance-data.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmsComponent } from './ems/ems.component';
import { ReportComponent } from './report/report.component';
import { SystemSettingComponent } from './system-setting/system-setting.component';
import { ExportComponent } from './export/export.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'Login',
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'Home',
    component: HomeComponent,
    children: [
      {
        path: 'SystemScope',
        component: SystemScopeComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'Signal',
        component: SignalComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'DAU',
        component: DAUComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'Curve',
        component: CurveComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'EMS',
        component: EmsComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'Report',
        component: ReportComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'GraphicalSymbols',
        component: GraphicalSymbolsComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'SystemSetting',
        component: SystemSettingComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'Export',
        component: ExportComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'AdvanceData',
        component: AdvanceDataComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'testarea',
        component: TestAreaComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'SystemScope',
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
