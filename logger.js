//logger
var fs = require('fs');
var _ = require('lodash');
var request = require('request');
var cheerio = require('cheerio');
var colors = require('colors');
var moment = require('moment');

// server
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// logger things
var config = JSON.parse(fs.readFileSync('config.json'));
var baseUrl = config.dwUrl;
var httpOptions = {
    'auth': {
        'user': config.username,
        'pass': config.password,
        'sendImmediately': true
    },
    strictSSL: false
};

var theme = {
    DEFAULT: 'grey',
    DEBUG: 'cyan',
    ERROR: 'red',
    WARN: 'yellow',
    Job: 'grey'
};
colors.setTheme(theme);

var logs = {};
var logList = {};
var diffLog = {};
var watchList = [];

io.on('connection', function(socket) {
    console.log('client connected');

    socket.on('updateLogs', function(log) {
        var data = JSON.parse(log);
        for (key in data) {
            if (data[key]) {
                // add the log to the watchlist
                console.log('watching ' + key);
                watchList.push(key)
            } else {
                // remove the log from the watchlist
                var index = watchList.indexOf(key);
                if (index > -1) {
                    console.log('stop watching ' + key)
                    watchList.splice(index, 1);
                }
            }
        }
    });

    socket.on('disconnect', function() {
        console.log('client disconnected');
    });

    // Send the initial list of logs
    request.get(baseUrl + 'on/demandware.servlet/webdav/Sites/Logs', httpOptions,
        function(error, response, body) {
            if (error) {
                return console.error(error);
            }
            var list = [];

            $ = cheerio.load(body);
            $('tr').each(function(i, row) {
                var row = $(row).find('td:nth-child(1) > a > tt').text();
                if (row.indexOf('.log') > -1) {
                    list.push(row.split('-blade')[0]);
                }
            });
            // set the list
            logList = list;
            io.emit('logs', _.sortedUniq(list));
        });

    function checkLogs() {
        request.get(baseUrl + 'on/demandware.servlet/webdav/Sites/Logs', httpOptions,
            function(error, response, body) {
                if (error) {
                    return console.error(error);
                }

                $ = cheerio.load(body);
                var list = [];
                var logFiles = [];
                var rightNow = new Date();
                var searchDate = rightNow.toISOString().slice(0, 10).replace(/-/g, "");

                // create a mapping of logs and timestamps
                $('tr').each(function(i, row) {

                    //var logName = $(row).find('td:nth-child(1) > a > tt').text();
                    var logName;
                    var rowText = $(row).find('td:nth-child(1) > a > tt').text();
                    if (rowText.indexOf('.log') > -1) {
                        logName = rowText.split('-blade')[0];
                    }
                    var fileName = rowText.split('.')[0];
                    var timeStamp = $(row).find('td:nth-child(3) > tt').text();

                    // if the timestamp changes, download it
                    if (logs[fileName] && (logs[fileName].timeStamp !== timeStamp) && (watchList.indexOf(logs[fileName].logName) > -1)) {

                        // download the new log file...
                        request(logs[fileName].logLink, httpOptions, function(error, response, body) {
                            if (error) {
                                return console.error(error);
                            }

                            // if we have an existing line count, show the diff
                            if (!diffLog[fileName]) {
                                diffLog[fileName] = 1;
                            }

                            _.each(body.trim().split('\n').slice(-Math.max(body.trim().split('\n').length - diffLog[fileName], 1)), function(line) {
                                var dateString = line.match(/\[(.*?)\]/);
                                var message = line.split(']')[1];

                                // we will refactor this once we get more complex filtering
                                if (message) {
                                    // filter error message body
                                    if (logs[fileName].logName === 'error') {
                                        message = message.slice(message.indexOf(':') + 2, -1);
                                    }

                                    // parse the message body to be more human readable
                                    if (message === ':1') {
                                        message = false;
                                    }
                                }


                                if (message && dateString) {
                                    var logType = (theme[message.split(' ')[1]]) ? message.split(' ')[1] : 'DEFAULT';

                                    var event = {
                                        'name': logs[fileName].logName,
                                        'time': moment(new Date(dateString.toString().split(',')[0].replace(/[[\]]/g, ''))).format("h:mm:ss a"),
                                        'type': logType,
                                        'message': message
                                    };


                                    io.emit('message', event);
                                }
                            });

                            diffLog[fileName] = body.trim().split('\n').length;
                        });
                    }

                    logs[fileName] = {
                        'logName': logName,
                        'timeStamp': timeStamp,
                        'logLink': baseUrl + $(row).find('td:nth-child(1) > a').attr('href')
                    };
                });
            });
    }

    // watch for updates
    setInterval(checkLogs, 1000);

});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
