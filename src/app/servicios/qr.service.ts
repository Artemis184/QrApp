import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  scan: boolean = false;
  scanResult: string = '';

  constructor() {}

  async CheckPermission(): Promise<boolean> {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      return status.granted ?? false;  // Asegurar que retorna un booleano
    } catch (error) {
      console.error('Error al comprobar permisos:', error);
      return false;  // En caso de error, asumir que no hay permiso
    }
  }

  async StartScan() {
    if (this.scan) {
      this.StopScan();
      return;
    }

    this.scan = true;
    const permission = await this.CheckPermission();  // Esperar la respuesta de los permisos

    if (!permission) {
      alert('No se ha concedido permiso para acceder a la cámara');
      this.scan = false;
      this.scanResult = 'Error, no hay permisos';
      return;
    }

    try {
      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');

      const result = await BarcodeScanner.startScan();
      console.log('Resultado:', result);

      BarcodeScanner.showBackground();
      document.querySelector('body')?.classList.remove('scanner-active');
      this.scan = false;

      if (result.hasContent) {
        this.scanResult = result.content;
      } else {
        this.scanResult = 'No se detectó ningún código';
      }
    } catch (error) {
      console.error('Error en el escaneo:', error);
      this.scanResult = 'Error durante el escaneo';
      this.scan = false;
    }
  }

  StopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
    this.scan = false;
    this.scanResult = 'Escaneo cancelado';
  }
}
