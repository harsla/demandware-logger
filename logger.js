var fs = require('fs')
var _ = require('lodash');
var request = require('request');
var cheerio = require('cheerio');
var colors = require('colors');
var moment = require('moment');
var config = JSON.parse(fs.readFileSync('config.json'))
var baseUrl = config.dwUrl;
var httpOptions = ***REMOVED***
    'auth': ***REMOVED***
        'user': config.username,
        'pass': config.password,
        'sendImmediately': true
    ***REMOVED***,
    strictSSL: false
***REMOVED***;

var theme = ***REMOVED***
    DEFAULT: 'grey',
    DEBUG: 'cyan',
    ERROR: 'red',
    WARN: 'yellow',
    Job: 'grey',
    // input: 'grey',
    // verbose: 'cyan',
    // prompt: 'grey',
    // info: 'green',
    // data: 'grey',
    // help: 'cyan',
    // warn: 'yellow',
    // debug: 'blue',
    // error: 'red'
***REMOVED***;
colors.setTheme(theme);

var logs = ***REMOVED******REMOVED***;
var diffLog = ***REMOVED******REMOVED***;

function checkLogs() ***REMOVED***
    request.get(baseUrl + 'on/demandware.servlet/webdav/Sites/Logs', httpOptions,
        function(error, response, body) ***REMOVED***
            if (error) ***REMOVED***
                return console.error(error);
            ***REMOVED***

            $ = cheerio.load(body);
            var logFiles = [];
            var rightNow = new Date();
            var searchDate = rightNow.toISOString().slice(0, 10).replace(/-/g, "");

            // create a mapping of logs and timestamps
            $('tr').each(function(i, row) ***REMOVED***
                var logName = $(row).find('td:nth-child(1) > a > tt').text();
                var fileName = logName.split('.')[0];
                var timeStamp = $(row).find('td:nth-child(3) > tt').text();

                // if the timestamp changes, download it
                if (logs[fileName] && (logs[fileName].timeStamp !== timeStamp) && (config.watch.indexOf(logs[fileName].logName.slice(0, -13)) > -1)) ***REMOVED***

                    // download the new log file...
                    request(logs[fileName].logLink, httpOptions, function(error, response, body) ***REMOVED***
                        if (error) ***REMOVED***
                            return console.error(error);
                        ***REMOVED***

                        // if we have an exsisting linecount, show the diff
                        if (diffLog[fileName]) ***REMOVED***
                            _.each(body.trim().split('\n').slice(-Math.max(body.trim().split('\n').length - diffLog[fileName], 1)), function(line) ***REMOVED***
                                var dateString = line.match(/\[(.*?)\]/);
                                var message = line.split(']')[1]
                                if (message && dateString) ***REMOVED***
                                    var logType = (theme[message.split(' ')[1]]) ? message.split(' ')[1] : 'DEFAULT';
                                    console.log(logs[fileName].logName + ": " + colors.bgMagenta("  " + moment(new Date(dateString.toString().split(',')[0].replace(/[[\]]/g, ''))).format("h:mm:ss a") + "  "), colors[logType](line.split('GMT] ')[1]));
                                ***REMOVED***
                            ***REMOVED***);
                        // otherwise show the last line
                        ***REMOVED*** else ***REMOVED***
                            var line = body.trim().split('\n').slice(-1)[0];
                            var dateString = line.match(/\[(.*?)\]/);
                            var message = line.split(']')[1]
                                if (message && dateString) ***REMOVED***
                                    var logType = (theme[message.split(' ')[1]]) ? message.split(' ')[1] : 'DEFAULT';
                                    console.log(logs[fileName].logName + ": " + colors.bgMagenta("  " + moment(new Date(dateString.toString().split(',')[0].replace(/[[\]]/g, ''))).format("h:mm:ss a") + "  "), colors[logType](line.split('GMT] ')[1]));
                                ***REMOVED***
                        ***REMOVED***

                        diffLog[fileName] = body.trim().split('\n').length;
                    ***REMOVED***)
                ***REMOVED***

                logs[fileName] = ***REMOVED***
                    'logName': logName,
                    'timeStamp': timeStamp,
                    'logLink': baseUrl + $(row).find('td:nth-child(1) > a').attr('href')
                ***REMOVED***

            ***REMOVED***);
        ***REMOVED***);
***REMOVED***

setInterval(checkLogs, 1000);
