var fs = require('fs')
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');
var colors = require('colors');
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
var logs = ***REMOVED******REMOVED***;

function checkLogs() ***REMOVED***
    request.get(baseUrl + 'on/demandware.servlet/webdav/Sites/Logs', httpOptions,
        function(error, response, body) ***REMOVED***
            var logFiles = [];
            $ = cheerio.load(body);
            var rightNow = new Date();
            var searchDate = rightNow.toISOString().slice(0, 10).replace(/-/g, "");

            // create a mapping of logs and timestamps

            // body > table > tbody > tr:nth-child(3) > td:nth-child(1) > a
            $('tr').each(function(i, row) ***REMOVED***
                var logName = $(row).find('td:nth-child(1) > a > tt').text();
                var fileName = logName.split('.')[0];
                var timeStamp = $(row).find('td:nth-child(3) > tt').text();

                //if the timestamp changes, add it to the download list
                if (logs[fileName] && (logs[fileName].timeStamp !== timeStamp)) ***REMOVED***
                    console.log('==================================== ' + logs[fileName].logName + ' ====================================')

                    // download the new log file...
                    request(logs[fileName].logLink, httpOptions, function(error, response, body) ***REMOVED***
                        if (!error && response.statusCode === 200) ***REMOVED***
                            switch (logs[fileName].logName.split('-')[0]) ***REMOVED***
                                case 'debug' || 'customdebug':
                                    console.log(body .cyan);
                                    break;
                                case 'error' || 'customerror':
                                    console.log(body .red);
                                    break;
                                case 'warn' || 'customwarn':
                                    console.log(body .yellow);
                                    break;
                                case 'custom':
                                    console.log(body .magenta);
                                    break;
                                case 'jobs' || 'quota':
                                    break;
                                default: console.log(body)
                            ***REMOVED***
                        ***REMOVED***
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
