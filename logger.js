var fs = require('fs')
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');
var colors = require('colors');
var config = JSON.parse(fs.readFileSync('config.json'))
var baseUrl = config.dwUrl;
var httpOptions = {
    'auth': {
        'user': config.username,
        'pass': config.password,
        'sendImmediately': true
    },
    strictSSL: false
};
var logs = {};

function checkLogs() {
    request.get(baseUrl + 'on/demandware.servlet/webdav/Sites/Logs', httpOptions,
        function(error, response, body) {
            var logFiles = [];
            $ = cheerio.load(body);
            var rightNow = new Date();
            var searchDate = rightNow.toISOString().slice(0, 10).replace(/-/g, "");

            // create a mapping of logs and timestamps

            // body > table > tbody > tr:nth-child(3) > td:nth-child(1) > a
            $('tr').each(function(i, row) {
                var logName = $(row).find('td:nth-child(1) > a > tt').text();
                var fileName = logName.split('.')[0];
                var timeStamp = $(row).find('td:nth-child(3) > tt').text();

                //if the timestamp changes, add it to the download list
                if (logs[fileName] && (logs[fileName].timeStamp !== timeStamp)) {
                    console.log('==================================== ' + logs[fileName].logName + ' ====================================')

                    // download the new log file...
                    request(logs[fileName].logLink, httpOptions, function(error, response, body) {
                        if (!error && response.statusCode === 200) {
                            switch (logs[fileName].logName.split('-')[0]) {
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
                            }
                        }
                    })
                }

                logs[fileName] = {
                    'logName': logName,
                    'timeStamp': timeStamp,
                    'logLink': baseUrl + $(row).find('td:nth-child(1) > a').attr('href')
                }

            });
        });
}

setInterval(checkLogs, 1000);
