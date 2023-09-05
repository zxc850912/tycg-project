import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  tokenUrl = 'https://tycg-mas-system.azurewebsites.net/';
  apiUrl = 'https://tycg-mas-system.azurewebsites.net/api/';

  caseList$ = new BehaviorSubject<any>([]);     //建立觀察者物件才能訂閱值的變化,不然在其他元件初始要值會undefind
  caseNameList$ = new BehaviorSubject<any>([]);
  selected$ = new BehaviorSubject<any>(0);

  constructor(private http: HttpClient) {

  }

  token(x: any){      //輸入帳密要token
    return this.http.post(this.tokenUrl + 'login',
      x
    );
  }

  setCaseList(caseList: any){    // 儲存所有caseRoleKey
    this.caseList$.next(caseList);
  }

  getCaseList(): any {   // 拿出所有caseRoleKey
    return this.caseList$.asObservable();
  }

  setNameList(nameList: any){    // 儲存所有name
    this.caseNameList$.next(nameList);
  }

  getNameList(): any {   // 拿出所有name
    return this.caseNameList$.asObservable();
  }

  setSelected(selected: any){    // 儲存selected
    this.selected$.next(selected);
  }

  getSelected(): any {   // 拿出selected
    return this.selected$.asObservable();
  }

  InformationData(caseRoleKey: any){    //常駐表格資訊
    // return this.http.get(this.apiUrl + 'get-main-title');
    return this.http.get(this.apiUrl + 'get-main-title?setid=' + caseRoleKey);
  }

  SystemScope(seleted: any){        //SystemScope頁面資訊
    return this.http.get(this.apiUrl + 'get-system-scope?setid=' + seleted);
  }

  Signal(seleted: any){             //Signal頁面資訊
    return this.http.get(this.apiUrl + 'get-signal?setid=' + seleted);
  }

  DAU(seleted: any){             //DAU頁面資訊
    // return this.http.get(this.apiUrl + 'get-dau');
    return this.http.get(this.apiUrl + 'get-dau?setid=' + seleted);
  }

  CurveItem(){             //Curve圖表項目
    return this.http.get(this.apiUrl + 'get-curve-default-item');
  }

  CurveGuid(){             //Curve拿Guid值
    return this.http.get(this.apiUrl + 'get-curve-set-Item');
  }

  CurveLineChart(item: any,setItem: any,x: any){             //Curve折線圖
    console.log(item);
    if(item === 'Power Status & Flow Status'){
      item = 'Power Status %26 Flow Status';
    }
    return this.http.post(this.apiUrl + 'post-curve-default-Line?Item=' + item + '&setItem=' + setItem,
      x
    );
  }

  CurveScatterItem(){             //Curve散點圖項目
    return this.http.get(this.apiUrl + 'get-curve-scatter-item')
  }

  CurveScatterChart(setItem: any,targetName: any,max: any,min: any,xaxis: any,yaxis: any,x: any){        //Curve散點圖
    return this.http.post(this.apiUrl + 'post-curve-scatter-chart?setItem=' + setItem + '&targetname=' + targetName + '&Max=' + max +'&Min=' + min + '&xaxis=' + xaxis + '&yaxis=' + yaxis,
      x
    );
  }

  ExportMainItem(){             //報表水塔選擇
    return this.http.get(this.apiUrl + 'get-set-Item')
  }

  ExportItem(){             //水塔項目選擇
    return this.http.get(this.apiUrl + 'get-download-Item')
  }

  logDownLoad(setItem: any,downloadItem: any,x: any,option: any){        //報表log下載
    return this.http.post(this.apiUrl + 'Export/api/post-download-report?setItem='+ setItem + '&downloadItem=' + downloadItem,
      x,option
    );
  }

  analysisDownLoad(setItem: any,x: any,option: any){        //報表analysis下載
    return this.http.post(this.apiUrl + 'Export/api/post-download-analysis?setId='+ setItem,
      x,option
    );
  }

  SystemSettingData(seleted: any){
    return this.http.get(this.apiUrl + 'get-system.pa?setid=' + seleted)
  }

  SystemSettingPa(x: any,setId: any){
    return this.http.post(this.apiUrl + 'post-system.pa-set?setId=' + setId,
      x,{responseType: 'text'}
    );
  }

  SystemSettingSunangle(x: any,setId: any){
    return this.http.post(this.apiUrl + 'post-system.pa-solar?setId=' + setId,
      x,{responseType: 'text'}
    );
  }

  /** advance data*/
  advanceData(setid: any){
    return this.http.get(this.apiUrl + 'get-advancedata?setid=' + setid)
  }


}
