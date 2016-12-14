import './polyfills.ts';

import ***REMOVED*** platformBrowserDynamic ***REMOVED*** from '@angular/platform-browser-dynamic';
import ***REMOVED*** enableProdMode ***REMOVED*** from '@angular/core';
import ***REMOVED*** environment ***REMOVED*** from './environments/environment';
import ***REMOVED*** AppModule ***REMOVED*** from './app/';

if (environment.production) ***REMOVED***
  enableProdMode();
***REMOVED***

platformBrowserDynamic().bootstrapModule(AppModule);
