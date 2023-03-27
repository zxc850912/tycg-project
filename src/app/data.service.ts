import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'https://tycg-mas-system.azurewebsites.net/api/';

  constructor(private http: HttpClient) {

  }

  InformationData(){    //常駐表格資訊
    return this.http.get(this.apiUrl + 'get-main-title');
  }

  SystemScope(){        //SystemScope頁面資訊
    return this.http.get(this.apiUrl + 'get-system-scope');
  }

  Signal(){             //Signal頁面資訊
    return this.http.get(this.apiUrl + 'get-signal');
  }

  DAU(){             //DAU頁面資訊
    return this.http.get(this.apiUrl + 'get-dau');
  }

  CurveItem(){             //Curve圖表項目
    return this.http.get(this.apiUrl + 'get-curve-default-item');
  }

  CurveGuid(){             //Curve拿Guid值
    return this.http.get(this.apiUrl + 'get-curve-set-Item');
  }

  CurveLineChart(item: any,setItem: any,x: any){             //Curve折線圖
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

  ExportDownload(setItem: any,downloadItem: any,x: any,option: any){        //報表下載
    return this.http.post(this.apiUrl + 'Export/api/post-download-report?setItem='+ setItem + '&downloadItem=' + downloadItem,
      x,option
    );
  }

  SystemSettingData(){
    return this.http.get(this.apiUrl + 'get-system.pa')
  }

  SystemSettingPa(x: any){
    return this.http.post(this.apiUrl + 'post-system.pa-set',
      x,{responseType: 'text'}
    );
  }

  SystemSettingSunangle(x: any){
    return this.http.post(this.apiUrl + 'post-system.pa-solar',
      x,{responseType: 'text'}
    );
  }
}
