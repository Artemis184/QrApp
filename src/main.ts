import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { StatusBar } from '@capacitor/status-bar';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));


  const setStatusBar = async () => {
    await StatusBar.setOverlaysWebView({ overlay: false });
  };
  
  setStatusBar();