import ***REMOVED*** BrowserModule ***REMOVED*** from '@angular/platform-browser';
import ***REMOVED*** NgModule ***REMOVED*** from '@angular/core';
import ***REMOVED*** FormsModule ***REMOVED*** from '@angular/forms';
import ***REMOVED*** HttpModule ***REMOVED*** from '@angular/http';

import ***REMOVED*** AppComponent ***REMOVED*** from './app.component';
import ***REMOVED*** LoggerComponent ***REMOVED*** from './logger/logger.component';
import ***REMOVED*** LoggerService ***REMOVED*** from './logger/logger.service';

@NgModule(***REMOVED***
  declarations: [
    AppComponent,
    LoggerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [LoggerService],
  bootstrap: [AppComponent]
***REMOVED***)
export class AppModule ***REMOVED*** ***REMOVED***