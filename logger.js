var fs = require('fs')
var _ = require('lodash');
var request = require('request');
var cheerio = require('cheerio');
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
var diffLog = {};

function checkLogs() {
    request.get(baseUrl + 'on/demandware.servlet/webdav/Sites/Logs', httpOptions,
        function(error, response, body) {
            var logFiles = [];
            $ = cheerio.load(body);
            var rightNow = new Date();
            var searchDate = rightNow.toISOString().slice(0, 10).replace(/-/g, "");

            // create a mapping of logs and timestamps
            $('tr').each(function(i, row) {
                var logName = $(row).find('td:nth-child(1) > a > tt').text();
                var fileName = logName.split('.')[0];
                var timeStamp = $(row).find('td:nth-child(3) > tt').text();



                // if the timestamp changes, download it
                if (logs[fileName] && (logs[fileName].timeStamp !== timeStamp) && (config.watch.indexOf(logs[fileName].logName.slice(0, -13)) > -1)) {

                    // download the new log file...
                    request(logs[fileName].logLink, httpOptions, function(error, response, body) {
                        if (error) {
                            return console.error(error);
                        }

                        if (diffLog[fileName]) {
                            _.each(body.trim().split('\n').slice(-Math.max(body.trim().split('\n').length - diffLog[fileName], 1)), function(line) {
                                console.log(colors.green(logs[fileName].logName + ": ") + colors.grey(line.match(/\[(.*?)\]/).toString().split(',')[0]), colors.red(line.split('GMT] ')[1]));
                            });
                        } else {
                            var line = body.trim().split('\n').slice(-1)[0];
                            console.log(colors.green(logs[fileName].logName + ": ") + colors.grey(line.match(/\[(.*?)\]/).toString().split(',')[0]), colors.red(line.split('GMT] ')[1]));
                        }

                        diffLog[fileName] = body.trim().split('\n').length;
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
