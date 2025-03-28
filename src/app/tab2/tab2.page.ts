import { Component } from '@angular/core';
import { QrService } from '../servicios/qr.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  scannedCodes: string[] = [];

  constructor(private qr: QrService) {
    console.log(this.scannedCodes);
  }


  ngOnInit() {
    this.fun_ver_listaQR(); // Obtener lista de códigos escaneados al iniciar
    console.log("LISTA RECUPERADA:",this.fun_ver_listaQR);

  }



  fun_ver_listaQR() {
    this.scannedCodes = this.qr.getScannedCodes(); // Obtener la lista cuando la pestaña se abre
    console.log("LISTA RECUPERADA: ", this.scannedCodes)
  }


  fun_eliminar(ionItemSliding: any, codigo: string) {
    ionItemSliding.close();
    
    const indiceABorrar = this.scannedCodes.indexOf(codigo); // Buscar el índice del código a borrar

    if (indiceABorrar !== -1) {
      console.log("Código Borrado con éxito");
      this.scannedCodes.splice(indiceABorrar, 1); // Eliminar el código de la lista
    }

    console.log(this.scannedCodes);
  }
}




