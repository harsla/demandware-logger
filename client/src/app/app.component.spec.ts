/* tslint:disable:no-unused-variable */

import ***REMOVED*** TestBed, async ***REMOVED*** from '@angular/core/testing';
import ***REMOVED*** AppComponent ***REMOVED*** from './app.component';

describe('AppComponent', () => ***REMOVED***
  beforeEach(() => ***REMOVED***
    TestBed.configureTestingModule(***REMOVED***
      declarations: [
        AppComponent
      ],
    ***REMOVED***);
    TestBed.compileComponents();
  ***REMOVED***);

  it('should create the app', async(() => ***REMOVED***
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  ***REMOVED***));

  it(`should have as title 'app works!'`, async(() => ***REMOVED***
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  ***REMOVED***));

  it('should render title in a h1 tag', async(() => ***REMOVED***
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  ***REMOVED***));
***REMOVED***);
