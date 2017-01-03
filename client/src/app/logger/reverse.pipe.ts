import ***REMOVED*** Pipe, PipeTransform ***REMOVED*** from '@angular/core';

@Pipe(***REMOVED***
  name: 'reverse'
***REMOVED***)
export class ReversePipe ***REMOVED***
  transform(arr) ***REMOVED***
    var copy = arr.slice();
    return copy.reverse();
  ***REMOVED***
***REMOVED***
