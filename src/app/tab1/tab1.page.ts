import { Component } from '@angular/core';
import { QrService } from '../servicios/qr.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page {

  objectJSON = false;
  JsonData : any;

  constructor(public qr: QrService) {}

  async scaner(){
    await this.qr.StartScan();
    try {
      let parseResult = JSON.parse(this.qr.scanResult);
      console.log(parseResult);
      if(parseResult.escaneo){
        this.objectJSON = true;
        this.JsonData = parseResult.data;
      }
    } catch (error) {
      console.log('No es un JSON');
      
    }


  }


}
     