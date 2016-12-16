import ***REMOVED*** BrowserModule ***REMOVED*** from '@angular/platform-browser';
import ***REMOVED*** NgModule ***REMOVED*** from '@angular/core';
import ***REMOVED*** FormsModule ***REMOVED*** from '@angular/forms';
import ***REMOVED*** HttpModule ***REMOVED*** from '@angular/http';
import ***REMOVED*** AlertModule ***REMOVED*** from 'ng2-bootstrap/ng2-bootstrap';
import ***REMOVED***MultiselectDropdownModule***REMOVED*** from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

import ***REMOVED*** AppComponent ***REMOVED*** from './app.component';
import ***REMOVED*** LoggerComponent ***REMOVED*** from './logger/logger.component';

@NgModule(***REMOVED***
  declarations: [
    AppComponent,
    LoggerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MultiselectDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
***REMOVED***)
export class AppModule ***REMOVED*** ***REMOVED***
