import ***REMOVED*** browser, element, by ***REMOVED*** from 'protractor';

export class ClientPage ***REMOVED***
  navigateTo() ***REMOVED***
    return browser.get('/');
  ***REMOVED***

  getParagraphText() ***REMOVED***
    return element(by.css('app-root h1')).getText();
  ***REMOVED***
***REMOVED***
