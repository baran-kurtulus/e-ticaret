import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

import 'bootstrap'

if (typeof window !== 'undefined') { //Jquery SSR ile Çakışmasın diye
  import('jquery').then((mod) => {
    const $ = (mod as any).default ?? (mod as any);
    (window as any).$ = (window as any).jQuery = $;
  });
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
