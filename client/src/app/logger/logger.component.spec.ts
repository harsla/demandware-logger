/* tslint:disable:no-unused-variable */
import ***REMOVED*** async, ComponentFixture, TestBed ***REMOVED*** from '@angular/core/testing';
import ***REMOVED*** By ***REMOVED*** from '@angular/platform-browser';
import ***REMOVED*** DebugElement ***REMOVED*** from '@angular/core';

import ***REMOVED*** LoggerComponent ***REMOVED*** from './logger.component';

describe('LoggerComponent', () => ***REMOVED***
  let component: LoggerComponent;
  let fixture: ComponentFixture<LoggerComponent>;

  beforeEach(async(() => ***REMOVED***
    TestBed.configureTestingModule(***REMOVED***
      declarations: [ LoggerComponent ]
    ***REMOVED***)
    .compileComponents();
  ***REMOVED***));

  beforeEach(() => ***REMOVED***
    fixture = TestBed.createComponent(LoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  ***REMOVED***);

  it('should create', () => ***REMOVED***
    expect(component).toBeTruthy();
  ***REMOVED***);
***REMOVED***);
