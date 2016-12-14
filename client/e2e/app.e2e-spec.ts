import ***REMOVED*** ClientPage ***REMOVED*** from './app.po';

describe('client App', function() ***REMOVED***
  let page: ClientPage;

  beforeEach(() => ***REMOVED***
    page = new ClientPage();
  ***REMOVED***);

  it('should display message saying app works', () => ***REMOVED***
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  ***REMOVED***);
***REMOVED***);
